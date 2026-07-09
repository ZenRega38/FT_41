import sys
import os
import gdown

folders = [
    "1wKga1ch3MDRncGWrTVvwtm6cl1Kma9ei",
    "1Gyo49jQZtfL3wuNlccHQObNveMUxbj1-",
    "1TxLfklZ5cEMNJSFuEZaiNU4GcMNKB2mY",
    "1MS9AdOIdfSPahDBlJKdfFoZQ0qOgW5xv",
    "1PdTOdqZVkIHDYATub4XO-NUKo-cuWEsC",
    "16bwC7yIL6ulWvdt61NBwy-jzrMAxFWaw"
]

output_dir = "LIPUTAN"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# We just want to get 3-5 files per folder without downloading gigabytes
# Since we don't have Drive API key, we'll try using gdown.download_folder 
# but unfortunately we can't easily limit it. We will use a hack:
# Start a process to run gdown --folder, wait a few seconds, then kill it!

import subprocess
import time

for folder_id in folders:
    print(f"Downloading from folder {folder_id}...")
    url = f"https://drive.google.com/drive/folders/{folder_id}"
    
    # Run gdown
    process = subprocess.Popen(["gdown", "--folder", url, "-O", output_dir])
    
    # Wait for 15 seconds to let it download a few files
    time.sleep(20)
    
    # Kill process
    process.terminate()
    process.wait()
    print(f"Stopped downloading for folder {folder_id}.")

print("Finished downloading sample images.")
