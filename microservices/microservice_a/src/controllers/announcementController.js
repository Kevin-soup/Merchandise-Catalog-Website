import { Router } from "express";
import { isExpired, parseExpiration } from "../utils/helpers.mjs";
import {
  deleteAnnouncement,
  readAnnouncement,
  saveAnnouncement,
} from "../services/anouncementService.js";
const announcementRouter = Router();

announcementRouter
  .route("/")

  .get(async (req, res) => {
    /**
     * GET /announcement
     * @description Retrieve current announcement
     * @param None
     */

    const newAnnouncement = await readAnnouncement();

    // Check expiration if expired clear.
    if (newAnnouncement.expiresAt && isExpired(newAnnouncement.expiresAt)) {
      await saveAnnouncement({});
      newAnnouncement = {};
    }

    res.json(newAnnouncement);
  })

  .post(async (req, res) => {
    /**
     * POST /announcements
     * @description Create a new announcement
     * @param {string} req.body.message - (required)
     * @param {string|DATE} [req.body.expiresAt=null] - ISO 8601 UTC format (e.g., "2025-08-01T14:30:00Z")
     */

    const { message, expiresAt } = req.body;

    //Parse Data
    if (!message) {
      const err = new Error("Announcement required");
      err.name = "ValidationError";
      throw err;
    }
    const expirationDate = parseExpiration(expiresAt);

    const createdAt = new Date().toISOString();
    const newAnnouncement = {
      message,
      createdAt,
      ...(expirationDate ? { expiresAt: expirationDate } : {}),
    };

    const savedAnnouncement = await saveAnnouncement(newAnnouncement);

    res.status(201).json(savedAnnouncement);
  })

  /**
   * DELETE /announcement
   * @description Delete current announcement
   * @param None
   */

  .delete(async (req, res) => {
    await deleteAnnouncement();
    res.status(204).json({});
  });

export default announcementRouter;
