const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

const fixes = [
  { regex: /(hover:bg-[a-z0-9\-]+(?:\/[0-9]+)?)\s+dark:(bg-[a-z0-9\-]+(?:\/[0-9]+)?)/g, replacement: '$1 dark:hover:$2' },
  { regex: /(hover:text-[a-z0-9\-]+)\s+dark:(text-[a-z0-9\-]+)/g, replacement: '$1 dark:hover:$2' },
  { regex: /(hover:border-[a-z0-9\-]+)\s+dark:(border-[a-z0-9\-]+)/g, replacement: '$1 dark:hover:$2' },
  { regex: /(focus:ring-[a-z0-9\-]+)\s+dark:(ring-[a-z0-9\-]+)/g, replacement: '$1 dark:focus:$2' },
  { regex: /(focus:border-[a-z0-9\-]+)\s+dark:(border-[a-z0-9\-]+)/g, replacement: '$1 dark:focus:$2' },
  { regex: /(focus:bg-[a-z0-9\-]+)\s+dark:(bg-[a-z0-9\-]+)/g, replacement: '$1 dark:focus:$2' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  fixes.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed hovers: ${filePath}`);
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
