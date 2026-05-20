const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  content = content.replace(/dark:text-slate-400 dark:text-slate-400/g, 'dark:text-slate-400');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed duplicates: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx')) {
      processFile(filePath);
    }
  });
}

walkDir(directoryPath);
