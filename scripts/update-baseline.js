const fs = require('fs');
const path = require('path');

if (process.argv.length < 4) {
  console.error('Usage: node update-baseline.js <sourcePath> <destPath>');
  process.exit(2);
}

const src = path.resolve(process.argv[2]);
const dest = path.resolve(process.argv[3]);

fs.copyFile(src, dest, (err) => {
  if (err) {
    console.error('Error copying file:', err.message);
    process.exit(1);
  }
  console.log(`Copied ${src} -> ${dest}`);
});
