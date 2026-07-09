import subprocess
import os

# Define the categories and their respective drive folder IDs
folders = {
    "yudisium": [
        "1wKga1ch3MDRncGWrTVvwtm6cl1Kma9ei",
        "1Gyo49jQZtfL3wuNlccHQObNveMUxbj1-",
        "1TxLfklZ5cEMNJSFuEZaiNU4GcMNKB2mY"
    ],
    "kirab": [
        "1MS9AdOIdfSPahDBlJKdfFoZQ0qOgW5xv",
        "1PdTOdqZVkIHDYATub4XO-NUKo-cuWEsC"
    ]
    # Video folder is skipped as per Option A (will use links)
}

base_output = "LIPUTAN"

for category, ids in folders.items():
    cat_dir = os.path.join(base_output, category)
    if not os.path.exists(cat_dir):
        os.makedirs(cat_dir)
        
    for folder_id in ids:
        print(f"Downloading {category} folder: {folder_id}...")
        url = f"https://drive.google.com/drive/folders/{folder_id}"
        
        # We will download everything in the folder.
        # This will take some time, but we will let it finish.
        subprocess.run(["gdown", "--folder", url, "-O", cat_dir], check=False)

print("Finished downloading all photos!")
