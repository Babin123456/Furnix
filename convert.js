const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './images';

function processDirectory(dir) {
  // Read directory contents with file types to distinguish files from folders
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory()) {
      // Recursively process nested subdirectories
      processDirectory(fullPath);
    } else {
      // Use case-insensitive regex to match .png, .jpg, .PNG, .JPG, etc.
      if (/\.(png|jpg)$/i.test(dirent.name)) {
        const output = fullPath.replace(/\.(png|jpg)$/i, '.webp');
        
        sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(output, (err) => {
            if (err) console.error('Error converting', fullPath, err);
            else console.log('Converted:', fullPath, '→', output);
          });
      }
    }
  });
}

// Start processing from the root images directory
processDirectory(imagesDir);
