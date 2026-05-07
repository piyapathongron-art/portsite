import re
import os

filepath = 'app/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add import
if 'import { TechStack }' not in content:
    content = content.replace(
        'import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";',
        'import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";\nimport { TechStack } from "../../components/features/TechStack";'
    )

# 2. Add horizontalX and h-[400vh]
if 'const horizontalX' not in content:
    content = content.replace(
        'const gOutlineY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);',
        'const gOutlineY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);\n  const horizontalX = useTransform(scrollYProgress, [0.35, 1], ["0%", "-50%"]);'
    )
    content = content.replace(
        '<div ref={containerRef} className="relative w-full h-[150vh] bg-[#030303] text-white ">',
        '<div ref={containerRef} className="relative w-full h-[400vh] bg-[#030303] text-white ">'
    )

# 3. Restructure the body
if 'horizontalX' not in content[content.find('return'):]:
    nav_start = content.find('{/* Top Navigation */}')
    nav_end = content.find('</nav>', nav_start) + 6
    nav_block = content[nav_start:nav_end]
    
    # Remove the nav block from its original location
    content = content[:nav_start] + content[nav_end:]
    
    loading_start = content.find('{/* LOADING SCREEN (Only the first letter \'g\') */}')
    end_of_main_content = content.rfind('</motion.div>\n        </div>\n      </div>\n    </div>')
    
    block_to_wrap = content[loading_start:end_of_main_content]
    
    nav_animated = f"""
        {{/* Top Navigation - Fixed */}}
        <motion.div style={{{{ opacity: contentOpacity }}}} className="absolute top-0 w-full z-50 pointer-events-auto">
{nav_block}
        </motion.div>
"""

    horizontal_wrapper = f"""
        {{/* Horizontal Sliding Wrapper */}}
        <motion.div 
          style={{{{ x: horizontalX }}}} 
          className="absolute inset-0 w-[200vw] h-full flex pointer-events-none"
        >
          {{/* SECTION 1: Main Banner (100vw) */}}
          <div className="w-[100vw] h-full relative pointer-events-none">
{block_to_wrap}
          </div>

          {{/* SECTION 2: Tech Stack (100vw) */}}
          <div className="w-[100vw] h-full relative pointer-events-auto bg-[#030303]">
             <TechStack />
          </div>
        </motion.div>
"""

    content = content[:loading_start] + nav_animated + horizontal_wrapper + content[end_of_main_content:]

with open(filepath, 'w') as f:
    f.write(content)

print("Success")
