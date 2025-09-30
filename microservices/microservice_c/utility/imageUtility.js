import path from "path";
import fs from "fs";

/**
 *  Get or create the upload directory.
 *  Returns the path to 'uploads' folder.
 */
export function getUploadDir() {
  const uploadDir = "uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  return uploadDir;
}

/**
 *  Generate a unique filename based on current timestamp and original file extension.
 *
 *  @param {string} originalName - Original filename from uploaded file.
 *  @returns {string} Generated unique filename.
 */
export function generateFilename(originalName) {
  const ext = path.extname(originalName);
  const filename = `img_${Date.now()}${ext}`;
  return filename;
}
