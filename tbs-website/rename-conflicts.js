// Simple script to rename conflicting directories
const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\site source\\CODE\\tbs-website\\src\\app\\tips-tricks';
const conflicts = ['[id]', '[tipId]', '[slug]', '[id]-backup'];

conflicts.forEach(dir => {
  const oldPath = path.join(targetDir, dir);
  const newPath = path.join(targetDir, `_${dir}`);
  
  if (fs.existsSync(oldPath)) {
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${dir} to _${dir}`);
    } catch (error) {
      console.error(`Error renaming ${dir}:`, error.message);
    }
  }
});

console.log('Renaming complete!');