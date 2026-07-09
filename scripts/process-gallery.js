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
  
  // Read only files in the root of the category directory
  const files = fs.readdirSync(inputDir)
    .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpeg'))
    .filter(f => fs.statSync(path.join(inputDir, f)).isFile());
    
  const processed = [];

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = `${category}_${file.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`;
    const outputPath = path.join(outputDir, outputFileName);
    
    let tailwindRatioClass = 'aspect-square';
    
    try {
      const metadata = await sharp(inputPath).metadata();
      const ratio = metadata.width / metadata.height;
      
      if (ratio > 1.2) tailwindRatioClass = 'aspect-video';
      else if (ratio < 0.8) tailwindRatioClass = 'aspect-[3/4]';
      else tailwindRatioClass = 'aspect-[4/3]';

      if (!fs.existsSync(outputPath)) {
        console.log(`Processing ${category} / ${file}...`);
        await sharp(inputPath)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(outputPath);
      }
    } catch(e) {
      console.log(`Failed to process ${file}`, e);
      continue;
    }
      
    processed.push({
      ratio: tailwindRatioClass,
      label: `Momen ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      src: `/gallery/${outputFileName}`,
      category: category
    });
  }
  return processed;
}

async function run() {
  const yudisiumData = await processCategory('yudisium');
  const kirabData = await processCategory('kirab');
  
  // Video disabled for now per user request
  const allData = [...yudisiumData, ...kirabData].map((item, idx) => ({
    id: idx + 1,
    ...item
  }));

  const galleryJsonPath = path.join(process.cwd(), 'data', 'gallery.json');
  fs.writeFileSync(galleryJsonPath, JSON.stringify(allData, null, 2));
  console.log('Done! Created gallery.json with ' + allData.length + ' items.');
}

run().catch(console.error);
