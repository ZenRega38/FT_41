const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseInputDir = path.join(process.cwd(), 'LIPUTAN');
const outputDir = path.join(process.cwd(), 'public', 'gallery');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processCategory(category) {
  const inputDir = path.join(baseInputDir, category);
  if (!fs.existsSync(inputDir)) return [];
  
  const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
  const processed = [];

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = `${category}_${file.replace(/\.(jpg|png)$/i, '.webp')}`;
    const outputPath = path.join(outputDir, outputFileName);
    
    console.log(`Processing ${category} / ${file}...`);
    
    let tailwindRatioClass = 'aspect-square';
    try {
      const metadata = await sharp(inputPath).metadata();
      const ratio = metadata.width / metadata.height;
      
      if (ratio > 1.2) tailwindRatioClass = 'aspect-video';
      else if (ratio < 0.8) tailwindRatioClass = 'aspect-[3/4]';
      else tailwindRatioClass = 'aspect-square';

      if (!fs.existsSync(outputPath)) {
        await sharp(inputPath)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(outputPath);
      }
    } catch(e) {
      console.log(`Failed to process ${file}`);
      continue;
    }
      
    processed.push({
      ratio: tailwindRatioClass,
      label: `Momen ${category === 'yudisium' ? 'Yudisium' : 'Kirab'}`,
      src: `/gallery/${outputFileName}`,
      category: category
    });
  }
  return processed;
}

async function run() {
  const yudisiumData = await processCategory('yudisium');
  const kirabData = await processCategory('kirab');
  
  // We don't download videos, we just add dummy entries with direct drive links for now.
  // Actually, we will just use category filters on frontend. Let's add one video link as an example.
  const videoData = [
    {
      ratio: "aspect-video",
      label: "Trailer Yudisium Ke-41",
      src: "", // No direct image
      url: "https://drive.google.com/drive/folders/16bwC7yIL6ulWvdt61NBwy-jzrMAxFWaw", // Link to drive
      category: "video",
      isVideo: true
    }
  ];

  const allData = [...yudisiumData, ...kirabData, ...videoData].map((item, idx) => ({
    id: idx + 1,
    ...item
  }));

  const galleryJsonPath = path.join(process.cwd(), 'data', 'gallery.json');
  fs.writeFileSync(galleryJsonPath, JSON.stringify(allData, null, 2));
  console.log('Done! Created gallery.json with ' + allData.length + ' items.');
}

run().catch(console.error);
