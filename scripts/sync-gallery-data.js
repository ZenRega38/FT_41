const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '..', 'public', 'gallery');
const categories = ['kirab', 'yudisium'];

let allData = [];
let idCounter = 1;

categories.forEach(category => {
  const catDir = path.join(galleryDir, category);
  if (fs.existsSync(catDir)) {
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.webp'));
    files.forEach((file, i) => {
      // Rotate aspect ratios to create a nice masonry layout
      let ratio = "aspect-square";
      if (i % 5 === 0) ratio = "aspect-[4/3]";
      else if (i % 7 === 0) ratio = "aspect-[3/4]";
      
      allData.push({
        id: idCounter++,
        ratio: ratio,
        label: `Momen ${category.charAt(0).toUpperCase() + category.slice(1)} ${i + 1}`,
        src: `/gallery/${category}/${file}`,
        category: category
      });
    });
  }
});

const galleryJsonPath = path.join(__dirname, '..', 'data', 'gallery.json');
fs.writeFileSync(galleryJsonPath, JSON.stringify(allData, null, 2));
console.log(`Synced gallery data with ${allData.length} items from actual folders.`);
