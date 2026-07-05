const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const sharp = require('sharp');

const csvPath = path.join(__dirname, '../data/DAFTAR_NAMA_YUDISIUM_KE_41.csv');
const jsonPath = path.join(__dirname, '../data/participants.json');
const outDir = path.join(__dirname, '../public/graduates');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function runSync() {
    console.log('Reading CSV...');
    const csvContent = fs.readFileSync(csvPath, 'utf8');

    // Find the header row
    const lines = csvContent.split(/\r?\n/);
    let headerIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('No.;')) {
            headerIndex = i;
            break;
        }
    }

    if (headerIndex === -1) {
        console.error("Header row not found in CSV.");
        return;
    }

    const dataLines = lines.slice(headerIndex);
    const cleanCsv = dataLines.join('\n');

    console.log('Parsing CSV...');
    Papa.parse(cleanCsv, {
        header: true,
        delimiter: ';',
        skipEmptyLines: true,
        complete: async (results) => {
            const existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            let updatedCount = 0;

            // Step 1: Update JSON with Google Drive links and extract gender if not set
            results.data.forEach(row => {
                const nim = row['NPM']?.trim();
                const rawPhoto = row['Foto']?.trim();
                const gender = row['Jenis Kelamin']?.trim();
                
                if (nim) {
                    const participant = existingJson.find(p => p.nim === nim);
                    if (participant) {
                        if (gender && !participant.gender) {
                            participant.gender = gender;
                        }

                        if (rawPhoto) {
                            let finalPhoto = rawPhoto;
                            const match = rawPhoto.match(/d\/([a-zA-Z0-9_-]+)\/view/);
                            if (match && match[1]) {
                                finalPhoto = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
                            }
                            
                            // Store the remote URL temporarily so we know to download it
                            if (participant.photo !== finalPhoto && !participant.photo.endsWith('.webp')) {
                                // If they already have a local .webp, don't overwrite unless we want to force re-download
                                // but for now, we'll assume if it's not a local webp, we download it.
                                participant._remotePhoto = finalPhoto;
                            }
                        }
                    }
                }
            });

            // Step 2: Download and optimize photos to WebP
            console.log('Downloading and optimizing photos to WebP...');
            for (let i = 0; i < existingJson.length; i++) {
                const participant = existingJson[i];
                
                // If the current photo is an http link OR we have a _remotePhoto set
                const urlToDownload = participant._remotePhoto || (participant.photo && participant.photo.startsWith('http') ? participant.photo : null);

                // Or if we already have a .jpg but want to convert it to .webp? Let's just download remote ones to .webp
                // Also, existing .jpg entries in JSON need to point to .webp if they exist on disk.
                
                const slug = participant.slug;
                const filename = `${slug}.webp`;
                const dest = path.join(outDir, filename);

                if (urlToDownload) {
                    console.log(`Downloading ${slug}...`);
                    try {
                        const res = await fetch(urlToDownload);
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        
                        const arrayBuffer = await res.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        
                        // Optimize with Sharp to WebP
                        await sharp(buffer)
                            .webp({ quality: 80 })
                            .toFile(dest);

                        participant.photo = `/graduates/${filename}`;
                        delete participant._remotePhoto;
                        updatedCount++;
                        console.log(`Saved and optimized ${filename}`);
                    } catch (e) {
                        console.error(`Failed to download/optimize for ${slug}: ${e.message}`);
                    }
                } else if (participant.photo && participant.photo.endsWith('.jpg')) {
                    // Try to convert existing local .jpg to .webp if it exists
                    const jpgPath = path.join(outDir, `${slug}.jpg`);
                    if (fs.existsSync(jpgPath) && !fs.existsSync(dest)) {
                        console.log(`Converting existing ${slug}.jpg to WebP...`);
                        try {
                            await sharp(jpgPath)
                                .webp({ quality: 80 })
                                .toFile(dest);
                            participant.photo = `/graduates/${filename}`;
                            updatedCount++;
                            // Optionally delete the old jpg to save space
                            fs.unlinkSync(jpgPath);
                        } catch(e) {
                            console.error(`Failed to convert ${slug}.jpg: ${e.message}`);
                        }
                    } else if (fs.existsSync(dest)) {
                        // Already converted, just update json
                        participant.photo = `/graduates/${filename}`;
                    }
                }
            }

            // Write updated JSON
            fs.writeFileSync(jsonPath, JSON.stringify(existingJson, null, 2));
            console.log(`Successfully finished sync. Updated ${updatedCount} photos.`);
        }
    });
}

runSync().catch(console.error);
