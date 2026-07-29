const fs = require('fs');
const path = require('path');

const mapping = require('./imagekit-url-mapping.json');
const SRC_DIR = path.join(__dirname, '../client/src');
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full));
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(SRC_DIR);
let totalReplacements = 0;
const changedFiles = [];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileChanged = false;

  for (const [localPath, liveUrl] of Object.entries(mapping)) {
    const patterns = [`"${localPath}"`, `'${localPath}'`];
    for (const pattern of patterns) {
      if (content.includes(pattern)) {
        const quote = pattern[0];
        content = content.split(pattern).join(`${quote}${liveUrl}${quote}`);
        fileChanged = true;
        totalReplacements++;
      }
    }
  }

  if (fileChanged) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles.push(path.relative(SRC_DIR, file));
  }
}

console.log(`Files changed: ${changedFiles.length}`);
for (const f of changedFiles) console.log(`  ${f}`);
console.log(`\nTotal replacements: ${totalReplacements}`);
