const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

const replacements = [
  // Backgrounds
  { regex: /bg-\[\#f8fafc\]/g, replacement: "bg-[#f8fafc] dark:bg-slate-950" },
  { regex: /bg-white/g, replacement: "bg-white dark:bg-slate-900" },
  { regex: /bg-slate-50(?!\/|0)/g, replacement: "bg-slate-50 dark:bg-slate-800" },
  { regex: /bg-slate-50\/([0-9]+)/g, replacement: "bg-slate-50/$1 dark:bg-slate-800/$1" },
  { regex: /bg-slate-100/g, replacement: "bg-slate-100 dark:bg-slate-800" },
  
  // Text
  { regex: /text-slate-900/g, replacement: "text-slate-900 dark:text-white" },
  { regex: /text-slate-800/g, replacement: "text-slate-800 dark:text-slate-100" },
  { regex: /text-slate-700/g, replacement: "text-slate-700 dark:text-slate-200" },
  { regex: /text-slate-600/g, replacement: "text-slate-600 dark:text-slate-300" },
  { regex: /text-slate-500/g, replacement: "text-slate-500 dark:text-slate-400" },
  
  // Borders
  { regex: /border-slate-100/g, replacement: "border-slate-100 dark:border-slate-800" },
  { regex: /border-slate-150/g, replacement: "border-slate-150 dark:border-slate-800" },
  { regex: /border-slate-200/g, replacement: "border-slate-200 dark:border-slate-700" },
  { regex: /border-slate-250/g, replacement: "border-slate-250 dark:border-slate-700" },
  { regex: /border-slate-300/g, replacement: "border-slate-300 dark:border-slate-600" },
  
  // Teal variations
  { regex: /text-teal-900/g, replacement: "text-teal-900 dark:text-teal-100" },
  { regex: /text-teal-700/g, replacement: "text-teal-700 dark:text-teal-300" },
  { regex: /bg-teal-50(?!\/|0)/g, replacement: "bg-teal-50 dark:bg-teal-900/30" },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(({ regex, replacement }) => {
    // We want to avoid matching if it already has dark:<class> directly touching it, but simple regex replace will run.
    // It's a bit naive, if we run it twice it would duplicate. We only run it once.
    content = content.replace(regex, replacement);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
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
console.log('Done.');
