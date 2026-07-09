const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseInputDir = path.join(process.cwd(), 'LIPUTAN');
const outputDir = path.join(process.cwd(), 'public', 'gallery');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function getFilesRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

async function processCategory(category) {
  const inputDir = path.join(baseInputDir, category);
  if (!fs.existsSync(inputDir)) return [];
  
  const files = getFilesRecursive(inputDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
  const processed = [];

  for (const inputPath of files) {
    const file = path.basename(inputPath);
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

async function processVideoCategory(category) {
  const inputDir = path.join(baseInputDir, category);
  if (!fs.existsSync(inputDir)) return [];
  
  const files = getFilesRecursive(inputDir).filter(f => f.toLowerCase().endsWith('.mp4') || f.toLowerCase().endsWith('.mov') || f.toLowerCase().endsWith('.webm'));
  const processed = [];

  for (let i = 0; i < files.length; i++) {
    const inputPath = files[i];
    const file = path.basename(inputPath);
    processed.push({
      ratio: "aspect-video",
      label: `Video Dokumentasi ${i+1}`,
      src: "", // No thumbnail for now, handled by frontend
      url: "https://drive.google.com/drive/folders/16bwC7yIL6ulWvdt61NBwy-jzrMAxFWaw", // Placeholder link
      category: category,
      isVideo: true
    });
  }
  return processed;
}

async function run() {
  const yudisiumData = await processCategory('yudisium');
  const kirabData = await processCategory('kirab');
  
  // Try to process video if downloaded
  let videoData = await processVideoCategory('video');
  
  if (videoData.length === 0) {
     videoData = [
      {
        ratio: "aspect-video",
        label: "Video Dokumentasi",
        src: "/gallery/video-placeholder.webp", // We need a real placeholder or handle in frontend
        url: "https://drive.google.com/drive/folders/16bwC7yIL6ulWvdt61NBwy-jzrMAxFWaw", 
        category: "video",
        isVideo: true
      }
    ];
  }

  const allData = [...yudisiumData, ...kirabData, ...videoData].map((item, idx) => ({
    id: idx + 1,
    ...item
  }));

  const galleryJsonPath = path.join(process.cwd(), 'data', 'gallery.json');
  fs.writeFileSync(galleryJsonPath, JSON.stringify(allData, null, 2));
  console.log('Done! Created gallery.json with ' + allData.length + ' items.');
}

run().catch(console.error);
