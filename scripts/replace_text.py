import os
import re
import shutil

old_dir = r"d:\Antigravity\projects\FT_41\app\peserta"
new_dir = r"d:\Antigravity\projects\FT_41\app\lulusan"

if os.path.exists(old_dir):
    if os.path.exists(new_dir):
        # Maybe copy contents and delete old_dir
        import distutils.dir_util
        distutils.dir_util.copy_tree(old_dir, new_dir)
        shutil.rmtree(old_dir)
    else:
        os.rename(old_dir, new_dir)

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return

    new_content = content
    
    # Insinyur -> Calon Insinyur
    new_content = new_content.replace("{isPost ? 'insinyur' : 'calon insinyur'}", "'calon insinyur'")
    new_content = re.sub(r'(?<!Calon )Insinyur', 'Calon Insinyur', new_content)
    new_content = re.sub(r'(?<!calon )insinyur', 'calon insinyur', new_content)
    new_content = new_content.replace('71 Engineers', '71 Calon Insinyur')

    # Peserta -> Lulusan
    new_content = new_content.replace('Peserta', 'Lulusan')
    new_content = new_content.replace('peserta', 'lulusan')
    new_content = new_content.replace('PESERTA', 'LULUSAN')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(r"d:\Antigravity\projects\FT_41"):
    if ".git" in root or "node_modules" in root or ".next" in root:
        continue
    for file in files:
        if file.endswith((".ts", ".tsx", ".json", ".md")):
            filepath = os.path.join(root, file)
            process_file(filepath)
