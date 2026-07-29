const fs = require('fs');
const path = require('path');

const mapping = require('./imagekit-url-mapping.json');
const targetFile = path.join(__dirname, '../client/public/data.json');

let content = fs.readFileSync(targetFile, 'utf8');
let replacements = 0;
let missed = [];

for (const [localPath, liveUrl] of Object.entries(mapping)) {
  const pattern = `"${localPath}"`;
  if (content.includes(pattern)) {
    content = content.split(pattern).join(`"${liveUrl}"`);
    replacements++;
  }
}

// Check for unmatched local paths
const localRefs = content.match(/"\/images\/[^"]*"|"\/icons\/[^"]*"/g) || [];
for (const ref of localRefs) {
  const pathOnly = ref.replace(/^"|"$/g, '');
  if (!mapping[pathOnly]) missed.push(pathOnly);
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log(`data.json: ${replacements} replacements applied.`);
if (missed.length) {
  console.log(`\nUnmatched local paths (not in mapping — pre-existing gaps):`);
  missed.forEach(m => console.log(`  ${m}`));
}
