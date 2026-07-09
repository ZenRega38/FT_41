const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(process.cwd(), 'LIPUTAN');
const outputDir = path.join(process.cwd(), 'public', 'gallery');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
  let galleryData = [];
  const galleryJsonPath = path.join(process.cwd(), 'data', 'gallery.json');
  if (fs.existsSync(galleryJsonPath)) {
    try {
      galleryData = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf8'));
    } catch (e) {}
  }
  
  let id = galleryData.length > 0 ? Math.max(...galleryData.map(g => g.id)) + 1 : 1;
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = file.replace(/\.(jpg|png)$/i, '.webp');
    const outputPath = path.join(outputDir, outputFileName);
    
    // Check if already processed
    if (galleryData.some(g => g.src === `/gallery/${outputFileName}`)) {
      continue;
    }
    
    console.log(`Processing ${file}...`);
    
    // Get metadata to determine aspect ratio
    const metadata = await sharp(inputPath).metadata();
    const ratio = metadata.width / metadata.height;
    let tailwindRatioClass = 'aspect-square';
    if (ratio > 1.2) tailwindRatioClass = 'aspect-video';
    else if (ratio < 0.8) tailwindRatioClass = 'aspect-[3/4]';
    else tailwindRatioClass = 'aspect-square';

    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outputPath);
      
    galleryData.push({
      id: id++,
      ratio: tailwindRatioClass,
      label: `Momen Acara ${id-1}`,
      src: `/gallery/${outputFileName}`,
      category: 'yudisium'
    });
  }
  
  fs.writeFileSync(galleryJsonPath, JSON.stringify(galleryData, null, 2));
  console.log('Done! Created gallery.json');
}

processImages().catch(console.error);
