import os
import urllib.request

staff_dir = r"d:\Antigravity\projects\FT_41\public\staff"
os.makedirs(staff_dir, exist_ok=True)

images = {
    "c1.jpg": "https://drive.google.com/uc?export=download&id=1AQTYfPL20gLfUAZkbG74RxQsGCEW8_Vn",
    "c2.jpg": "https://drive.google.com/uc?export=download&id=1M2rq4qwDY20fnbxnDSVde0Ph0qRpFGmg",
    "c3.jpg": "https://drive.google.com/uc?export=download&id=1L0qf3eOQAw3N5Ujw2bsH0mj4hG-AK4Y2"
}

for name, url in images.items():
    path = os.path.join(staff_dir, name)
    try:
        urllib.request.urlretrieve(url, path)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
