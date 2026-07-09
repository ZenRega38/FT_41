const fs = require('fs');
const path = require('path');

const sampleImages = [
  '/gallery/yudisium_FKTK0175.webp',
  '/gallery/yudisium_FKTK0177.webp',
  '/gallery/yudisium_FKTK0178.webp',
  '/gallery/yudisium_FKTK0179.webp',
  '/gallery/yudisium_FKTK0181.webp',
  '/gallery/yudisium_FKTK0182.webp',
  '/gallery/yudisium_FKTK0183.webp',
  '/gallery/yudisium_FKTK0185.webp',
  '/gallery/yudisium_FKTK0186.webp',
  '/gallery/FKTK0238.webp',
  '/gallery/FKTK0240.webp',
  '/gallery/FKTK0243.webp',
  '/gallery/DEFC7611.webp',
  '/gallery/DEFC7612.webp'
];

let allData = [];
let idCounter = 1;

// Generate 40 Yudisium
for (let i = 0; i < 40; i++) {
  allData.push({
    id: idCounter++,
    ratio: i % 3 === 0 ? "aspect-[4/3]" : "aspect-square",
    label: `Momen Yudisium ${i+1}`,
    src: sampleImages[i % sampleImages.length],
    category: "yudisium"
  });
}

// Generate 25 Kirab
for (let i = 0; i < 25; i++) {
  allData.push({
    id: idCounter++,
    ratio: i % 2 === 0 ? "aspect-[3/4]" : "aspect-video",
    label: `Momen Kirab ${i+1}`,
    src: sampleImages[(i+5) % sampleImages.length],
    category: "kirab"
  });
}

const galleryJsonPath = path.join(__dirname, '..', 'data', 'gallery.json');
fs.writeFileSync(galleryJsonPath, JSON.stringify(allData, null, 2));
console.log(`Generated mock gallery with ${allData.length} items`);
