import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "../data/announcement.json");

export async function saveAnnouncement(message) {
  /**
   * @description Saves a message into JSON file
   * @param {Object} message - The announcement message to save. Should be a valid JavaScript object.
   */
  await fs.writeFile(DATA_FILE, JSON.stringify(message, null, 2), "utf-8");
  const savedAnnouncement = await readAnnouncement();
  return savedAnnouncement;
}

export async function readAnnouncement() {
  /**
   * @description reads the saved Announcement
   * @param None
   * */
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const announcement = JSON.parse(data);
    return announcement;
  } catch (err) {
    if (err.code === "ENOENT") {
      return {};
    }
    throw err;
  }
}

export async function deleteAnnouncement() {
  /**
   * @description Sets the announcement to an empty object.
   * @param None
   * */

  try {
    await fs.writeFile(DATA_FILE, JSON.stringify({}), "utf-8");
  } catch (error) {
    throw error;
  }
}
