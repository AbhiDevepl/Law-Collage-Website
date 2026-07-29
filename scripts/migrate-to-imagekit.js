const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const PUBLIC_DIR = path.join(__dirname, '../client/public');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic', '.mp4'];

function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_');
}

function walk(dir, base = '') {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full, rel));
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push({ fullPath: full, relPath: rel.replace(/\\/g, '/') });
    }
  }
  return results;
}

async function migrate() {
  const files = walk(PUBLIC_DIR);
  console.log(`Found ${files.length} files to migrate.`);

  const mapping = {};
  let uploaded = 0;
  let failed = [];

  for (const file of files) {
    try {
      const fileBuffer = fs.readFileSync(file.fullPath);
      const dir = path.dirname(file.relPath);
      const sanitizedDir = dir.split('/').map(sanitize).join('/');
      const ext = path.extname(file.relPath);
      const base = path.basename(file.relPath, ext);
      const sanitizedFileName = sanitize(base) + ext;
      const folder = sanitizedDir === '.' || sanitizedDir === '_' ? '/' : '/' + sanitizedDir;

      const result = await imagekit.upload({
        file: fileBuffer,
        fileName: sanitizedFileName,
        folder: folder,
        useUniqueFileName: false,
      });

      mapping['/' + file.relPath] = result.url;
      uploaded++;
      console.log(`[${uploaded}/${files.length}] ${file.relPath} -> ${result.url}`);
    } catch (err) {
      failed.push({ file: file.relPath, error: err.message });
      console.error(`FAILED: ${file.relPath} — ${err.message}`);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'imagekit-url-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );

  console.log(`\nDone. ${uploaded} uploaded, ${failed.length} failed.`);
  if (failed.length) {
    console.log('Failed files:', JSON.stringify(failed, null, 2));
  }
}

migrate().catch(err => { console.error(err); process.exit(1); });
