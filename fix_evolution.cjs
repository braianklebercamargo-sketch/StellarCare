const fs = require('fs');
let content = fs.readFileSync('src/components/EvolutionForm.tsx', 'utf8');
content = content.replace(/placeholder-slate-45[05]/g, 'placeholder-slate-400 dark:placeholder-slate-500');
fs.writeFileSync('src/components/EvolutionForm.tsx', content, 'utf8');
