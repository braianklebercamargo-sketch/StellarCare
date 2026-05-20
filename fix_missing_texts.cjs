const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

const fixes = [
  // text-slate-500 -> text-slate-500 dark:text-slate-400
  // but only if it's not already followed by dark:text-
  { regex: /text-slate-500(?!\s+dark:text-)/g, replacement: 'text-slate-500 dark:text-slate-400' },
  // text-slate-400 -> text-slate-400 dark:text-slate-400 (just to be safe? no, maybe it's fine)
  // Let's also do placeholder-slate-400? We did that.
  { regex: /text-slate-400(?!\s+dark:text-)/g, replacement: 'text-slate-400 dark:text-slate-400' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  fixes.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Padded dark text: ${filePath}`);
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
