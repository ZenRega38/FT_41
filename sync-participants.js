const fs = require('fs');
const Papa = require('papaparse');

const csvPath = 'data/DAFTAR_NAMA_YUDISIUM_KE_41.csv';
const jsonPath = 'data/participants.json';

const csvContent = fs.readFileSync(csvPath, 'utf8');

// The CSV is separated by ';' and has a couple of title rows.
// Let's just find the row that starts with 'No.' or 'No;' to use as header
const lines = csvContent.split(/\r?\n/);
let headerIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('No.;')) {
        headerIndex = i;
        break;
    }
}

if (headerIndex !== -1) {
    const dataLines = lines.slice(headerIndex);
    const cleanCsv = dataLines.join('\n');

    Papa.parse(cleanCsv, {
        header: true,
        delimiter: ';',
        skipEmptyLines: true,
        complete: (results) => {
            const existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            
            let updatedCount = 0;
            results.data.forEach(row => {
                const nim = row['NPM']?.trim();
                const rawPhoto = row['Foto']?.trim();
                
                if (nim && rawPhoto) {
                    let finalPhoto = rawPhoto;
                    // Convert Google Drive view link to direct link
                    const match = rawPhoto.match(/d\/([a-zA-Z0-9_-]+)\/view/);
                    if (match && match[1]) {
                        finalPhoto = `https://lh3.googleusercontent.com/d/${match[1]}`;
                    }
                    
                    const participant = existingJson.find(p => p.nim === nim);
                    if (participant && participant.photo !== finalPhoto) {
                        participant.photo = finalPhoto;
                        updatedCount++;
                    }
                }
            });

            fs.writeFileSync(jsonPath, JSON.stringify(existingJson, null, 2));
            console.log(`Successfully synced ${updatedCount} new photos from CSV to JSON!`);
        }
    });
} else {
    console.error("Header row not found in CSV.");
}
