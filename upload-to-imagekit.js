#!/usr/bin/env node

const ImageKit = require("imagekit");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;

if (!IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
  console.error("ERROR: Missing IMAGEKIT_PRIVATE_KEY or IMAGEKIT_URL_ENDPOINT in .env");
  process.exit(1);
}

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});

const IMAGE_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico", ".tiff", ".tif", ".heic", ".heif",
]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".avi", ".mkv", ".flv", ".wmv", ".m4v"]);
const ALL_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS]);

const ASSET_ROOT = path.join(__dirname, "client", "public");
const ROOT_PREFIX = "client/public";

function walkDir(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ALL_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function sanitizeIK(str) {
  return str
    .replace(/[()]/g, "_")
    .replace(/\s+/g, "-")
    .replace(/^[0-9]+\./, (m) => m.replace(".", "-"))
    .replace(/[^a-zA-Z0-9_\-\/]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toImageKitFolder(localPath) {
  const rel = path.relative(ASSET_ROOT, localPath).replace(/\\/g, "/");
  const dir = path.dirname(rel);
  if (dir === ".") return `/${ROOT_PREFIX}`;
  const parts = dir.split("/").map(sanitizeIK);
  return `/${ROOT_PREFIX}/${parts.join("/")}`;
}

function toImageKitFileName(localPath) {
  return path.basename(localPath).replace(/\s+/g, "_");
}

async function uploadFile(localPath, index, total) {
  const ikFolder = toImageKitFolder(localPath);
  const ikFileName = toImageKitFileName(localPath);
  const relPath = path.relative(path.join(__dirname), localPath).replace(/\\/g, "/");

  console.log(`[${index}/${total}] Uploading: ${relPath}`);

  const fileBuffer = fs.readFileSync(localPath);

  const result = await imagekit.upload({
    file: fileBuffer,
    fileName: ikFileName,
    folder: ikFolder,
    useUniqueFileName: false,
  });

  console.log(`  -> ${result.url}`);
  return { localPath: relPath, imageKitUrl: result.url };
}

async function main() {
  console.log("Scanning for assets...\n");
  const files = walkDir(ASSET_ROOT);
  console.log(`Found ${files.length} files to upload.\n`);

  if (files.length === 0) {
    console.log("No files found. Exiting.");
    return;
  }

  const mapping = {};
  const failed = [];
  let successCount = 0;

  for (let i = 0; i < files.length; i++) {
    try {
      const result = await uploadFile(files[i], i + 1, files.length);
      mapping[result.localPath] = result.imageKitUrl;
      successCount++;
    } catch (err) {
      const relPath = path.relative(path.join(__dirname), files[i]).replace(/\\/g, "/");
      failed.push({ path: relPath, error: err.message || String(err) });
      console.error(`  !! FAILED: ${relPath} — ${err.message || err}\n`);
    }
  }

  const mapPath = path.join(__dirname, "imagekit-url-map.json");
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`\nMapping saved to: ${mapPath}`);

  console.log(`\n===== UPLOAD SUMMARY =====`);
  console.log(`Total files found: ${files.length}`);
  console.log(`Uploaded successfully: ${successCount}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log(`\nFailed files:`);
    failed.forEach((f) => console.log(`  ${f.path} — ${f.error}`));
  }

  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
