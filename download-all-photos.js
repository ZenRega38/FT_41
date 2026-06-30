const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'data/participants.json');
const outDir = path.join(__dirname, 'public/graduates');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function downloadPhotos() {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let updated = 0;

    for (let i = 0; i < data.length; i++) {
        const participant = data[i];
        if (participant.photo && participant.photo.startsWith('http')) {
            const slug = participant.slug;
            const ext = '.jpg'; // Just default to .jpg for simplicity
            const filename = `${slug}${ext}`;
            const dest = path.join(outDir, filename);

            console.log(`Downloading ${slug}...`);
            try {
                const res = await fetch(participant.photo);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                
                const arrayBuffer = await res.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                fs.writeFileSync(dest, buffer);

                // Update JSON
                participant.photo = `/graduates/${filename}`;
                updated++;
                console.log(`Saved ${filename}`);
            } catch (e) {
                console.error(`Failed to download for ${slug}: ${e.message}`);
            }
        }
    }

    if (updated > 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
        console.log(`Successfully downloaded and updated ${updated} photos.`);
    } else {
        console.log('No photos needed downloading.');
    }
}

downloadPhotos();
