const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function searchSinta(name) {
    try {
        const query = encodeURIComponent(name);
        const url = `https://sinta.kemdikbud.go.id/authors?q=${query}`;
        const res = await fetch(url);
        const text = await res.text();
        const $ = cheerio.load(text);
        
        let imgUrl = null;
        $('.profile-id img').each((i, el) => {
            if (i === 0) {
                imgUrl = $(el).attr('src');
            }
        });
        
        if (!imgUrl) {
           $('img.profile-pic').each((i, el) => {
                if (i === 0) {
                    imgUrl = $(el).attr('src');
                }
            });
        }
        
        if (!imgUrl) {
            $('.profile-image img').each((i, el) => {
                if (i === 0) {
                    imgUrl = $(el).attr('src');
                }
            });
        }
        
        if (!imgUrl) {
            // SINTA author search results typically use .profile-img or something similar
             $('.profile-avatar img').each((i, el) => {
                if (i === 0) {
                    imgUrl = $(el).attr('src');
                }
            });
            // Just grab any image that looks like a profile picture
            $('img').each((i, el) => {
                const src = $(el).attr('src');
                if (src && src.includes('profile')) {
                    imgUrl = src;
                }
            });
        }

        return imgUrl;
    } catch (e) {
        console.error("Error fetching", name, e);
        return null;
    }
}

async function run() {
    const rawData = fs.readFileSync('data/staff.json');
    const data = JSON.parse(rawData);

    async function processEntity(entity) {
        if (!entity.image && entity.name && !entity.name.includes('[') && !entity.name.includes('Nama Dosen')) {
            // Remove titles for better search
            let cleanName = entity.name.replace(/Prof\.|Dr\.|Ir\.|S\.T\.|M\.T\.|S\.H\.|M\.H\.|S\.Kom\.|M\.Kom\.|S\.Pd\.|S\.Sc\.|M\.Sc\.|M\.Eng\.|Dr-Ing\.|IPM\./g, '');
            cleanName = cleanName.replace(/,/g, '').trim().replace(/\s+/g, ' ');
            console.log('Searching for:', cleanName);
            
            const img = await searchSinta(cleanName);
            if (img) {
                console.log('Found:', img);
                entity.image = img;
            } else {
                console.log('Not found for:', cleanName);
                // Fallback to UI Avatars with initial
                const nameParam = encodeURIComponent(cleanName);
                entity.image = `https://ui-avatars.com/api/?name=${nameParam}&background=141416&color=d4af37&size=256&font-size=0.33`;
            }
        }
    }

    for (let u of data.university) await processEntity(u);
    for (let f of data.faculty) await processEntity(f);
    for (let c of data.committee) await processEntity(c);
    
    for (let d of data.departments) {
        await processEntity(d.head);
        for (let l of d.lecturers) {
            await processEntity(l);
        }
    }

    fs.writeFileSync('data/staff.json', JSON.stringify(data, null, 2));
    console.log('Done!');
}

run();
