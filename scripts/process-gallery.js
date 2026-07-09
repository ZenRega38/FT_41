const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIRS = {
  kirab: path.join(__dirname, '../dokumentasi/Kirab'),
  yudisium: path.join(__dirname, '../dokumentasi/Yudisium')
};

const DEST_DIR_BASE = path.join(__dirname, '../public/gallery');
const BATCH_SIZE = 20;
const BATCH_DELAY_MS = 2000;

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function getFiles(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name))
      .map(entry => path.join(dirPath, entry.name));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

async function processImage(srcPath, destDir) {
  const ext = path.extname(srcPath);
  const basename = path.basename(srcPath, ext);
  // Sanitize filename
  const cleanName = basename.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const destPath = path.join(destDir, `${cleanName}.webp`);

  try {
    // Check if exists to skip
    await fs.access(destPath);
    return { skipped: true, srcPath, destPath };
  } catch {
    // File doesn't exist, proceed with processing
  }

  try {
    await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true }) // Reasonable max width for gallery
      .webp({ quality: 80, effort: 4 })
      .toFile(destPath);
    
    return { skipped: false, srcPath, destPath };
  } catch (err) {
    console.error(`Error processing ${srcPath}:`, err.message);
    return { skipped: false, error: err };
  }
}

async function main() {
  console.log('Starting image processing...');
  
  const tasks = [];

  for (const [category, dirPath] of Object.entries(SOURCE_DIRS)) {
    const destDir = path.join(DEST_DIR_BASE, category);
    await ensureDir(destDir);
    
    const files = await getFiles(dirPath);
    console.log(`Found ${files.length} images in ${category}`);
    
    for (const file of files) {
      tasks.push({ file, destDir, category });
    }
  }

  const totalTasks = tasks.length;
  console.log(`Total images to process: ${totalTasks}`);
  if (totalTasks === 0) {
    console.log('No images found to process.');
    return;
  }

  let completedTasks = 0;
  const startTime = Date.now();

  for (let i = 0; i < totalTasks; i += BATCH_SIZE) {
    const batch = tasks.slice(i, i + BATCH_SIZE);
    console.log(`\nProcessing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(totalTasks/BATCH_SIZE)} (${batch.length} images)...`);
    
    const batchStartTime = Date.now();
    const results = await Promise.all(
      batch.map(t => processImage(t.file, t.destDir))
    );
    
    const batchTime = Date.now() - batchStartTime;
    
    let skippedCount = 0;
    let processedCount = 0;
    let errorCount = 0;
    
    for (const res of results) {
      if (res.skipped) skippedCount++;
      else if (res.error) errorCount++;
      else processedCount++;
    }

    completedTasks += batch.length;
    
    const elapsedMs = Date.now() - startTime;
    const avgTimePerTask = elapsedMs / completedTasks;
    const remainingTasks = totalTasks - completedTasks;
    const etaMs = remainingTasks * avgTimePerTask;
    const delayEtaMs = Math.floor(remainingTasks / BATCH_SIZE) * BATCH_DELAY_MS;

    console.log(`Batch finished. Processed: ${processedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`);
    console.log(`Progress: ${completedTasks}/${totalTasks} (${Math.round((completedTasks/totalTasks)*100)}%)`);
    if (remainingTasks > 0) {
        console.log(`ETA: ${formatTime(etaMs + delayEtaMs)}`);
        console.log(`Waiting ${BATCH_DELAY_MS}ms before next batch...`);
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log('\n--- All processing complete ---');
  console.log(`Total time: ${formatTime(Date.now() - startTime)}`);
}

main().catch(console.error);
