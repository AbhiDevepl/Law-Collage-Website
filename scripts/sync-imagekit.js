const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const ROOT_DIR = path.join(__dirname, '..');
const CLIENT_DIR = path.join(ROOT_DIR, 'client');
const PUBLIC_DIR = path.join(CLIENT_DIR, 'public');
const MAPPING_PATH = path.join(__dirname, 'imagekit-url-mapping.json');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic', '.mp4'];
const ARCHIVE_DIR_NAME = '_migrated-archive';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function requireFromClient(name) {
  try {
    return require(name);
  } catch (rootError) {
    try {
      return createRequire(path.join(CLIENT_DIR, 'package.json'))(name);
    } catch {
      throw rootError;
    }
  }
}

function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_');
}

function loadMapping() {
  if (!fs.existsSync(MAPPING_PATH)) return {};
  return JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
}

function walk(dir, base = '') {
  let results = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name === ARCHIVE_DIR_NAME) continue;

    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(walk(full, rel));
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push({ fullPath: full, relPath: '/' + rel.replace(/\\/g, '/') });
    }
  }

  return results;
}

function getFolder(relPath) {
  const dir = path.dirname(relPath);
  const sanitizedDir = dir.split('/').map(sanitize).join('/');
  return sanitizedDir === '.' || sanitizedDir === '_' || sanitizedDir === '' ? '/' : sanitizedDir;
}

function createImageKitClient() {
  loadEnvFile(path.join(ROOT_DIR, '.env'));
  loadEnvFile(path.join(CLIENT_DIR, '.env'));

  const requiredKeys = ['IMAGEKIT_PUBLIC_KEY', 'IMAGEKIT_PRIVATE_KEY', 'IMAGEKIT_URL_ENDPOINT'];
  const missingKeys = requiredKeys.filter(key => !process.env[key]);
  if (missingKeys.length > 0) {
    console.error(`ImageKit sync: missing env var(s): ${missingKeys.join(', ')}`);
    return null;
  }

  const ImageKit = requireFromClient('imagekit');
  return new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}

async function sync() {
  const mapping = loadMapping();
  const files = walk(PUBLIC_DIR);
  const newFiles = files.filter(file => !mapping[file.relPath]);

  if (newFiles.length === 0) {
    console.log(`ImageKit sync: no new images found (${files.length} already synced, skipped).`);
    return;
  }

  console.log(
    `ImageKit sync: ${newFiles.length} new file(s) to upload ` +
    `(${files.length - newFiles.length} already synced, skipped).`
  );

  const imagekit = createImageKitClient();
  if (!imagekit) {
    console.error('ImageKit sync: skipped uploads because ImageKit credentials are unavailable.');
    return;
  }

  let uploaded = 0;
  let failed = 0;

  for (const file of newFiles) {
    try {
      const fileBuffer = fs.readFileSync(file.fullPath);
      const ext = path.extname(file.relPath);
      const base = path.basename(file.relPath, ext);
      const sanitizedFileName = sanitize(base) + ext;

      const result = await imagekit.upload({
        file: fileBuffer,
        fileName: sanitizedFileName,
        folder: getFolder(file.relPath),
        useUniqueFileName: false,
      });

      mapping[file.relPath] = result.url;
      uploaded++;
      console.log(`Uploaded: ${file.relPath} -> ${result.url}`);
    } catch (err) {
      failed++;
      console.error(`FAILED: ${file.relPath} - ${err.message}`);
    }
  }

  if (uploaded > 0) {
    fs.writeFileSync(MAPPING_PATH, JSON.stringify(mapping, null, 2) + '\n');
  }

  console.log(
    `ImageKit sync complete. ${uploaded} uploaded, ${failed} failed. ` +
    `Total mapped entries: ${Object.keys(mapping).length}`
  );
}

sync().catch(err => {
  console.error(err);
  process.exit(1);
});
