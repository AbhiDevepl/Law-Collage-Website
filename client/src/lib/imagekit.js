import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export default imagekit;

/**
 * Transform a local path to an ImageKit URL with optimizations.
 * @param {string} localPath - The local path (e.g. "/images/photo1.jpg")
 * @param {object} options - Transformation options
 * @param {number} [options.width] - Desired width
 * @param {number} [options.height] - Desired height
 * @param {string} [options.quality] - Quality (1-100 or "auto")
 * @param {string} [options.format] - Format ("auto", "webp", "avif")
 * @returns {string} The ImageKit URL with transformation params
 */
export function getImageKitUrl(localPath, options = {}) {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "";

  if (!urlEndpoint || !localPath) {
    return localPath;
  }

  // Strip leading slash for the path within ImageKit
  const ikPath = localPath.startsWith("/") ? localPath.slice(1) : localPath;

  // Build transformation query params
  const transformations = [];

  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  if (options.format) transformations.push(`f-${options.format}`);
  if (options.crop) transformations.push(`c-${options.crop}`);

  const transformationString = transformations.length > 0
    ? `?tr=${transformations.join(",")}`
    : "";

  return `${urlEndpoint}/${ikPath}${transformationString}`;
}
