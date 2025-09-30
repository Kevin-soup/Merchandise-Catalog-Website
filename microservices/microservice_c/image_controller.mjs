import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import "dotenv/config";
import { Image, connect } from "./image_model.mjs";

// Set up Express app.
const PORT = process.env.PORT || 4004;
const app = express();
app.use(express.json());

/**
 *  Start the Express server after MongoDB is connected.
 */
app.listen(PORT, async () => {
    await connect();
    console.log(`Image Upload Service is listening on http://localhost:${PORT}`);
});

/**
 *  Serve static files in /uploads directory.
 *  Allows frontend to display uploaded images.
 */
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(path.resolve(uploadDir)));

/**
 *  Set up multer to store uploaded files in /uploads folder.
 *  Files will be saved with a unique timestamp-based name.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `img_${Date.now()}${ext}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

/**
 *  Uploads an image and associates it with a product.
 * 
 *  Handles "POST" method for "/upload/:productId" endpoint.
 *  Requires image file in 'image' field and product ID in URL.
 */
app.post("/upload/:productId", upload.single("image"), async (req, res) => {
    const { productId } = req.params;

    try {
        // File upload failed or missing
        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded." });
        }

        // Construct full URL path to serve image
        const imageUrl = `/uploads/${req.file.filename}`;

        // Save to DB (update if already exists)
        await Image.findOneAndUpdate(
            { productId },
            { imageUrl },
            { upsert: true, new: true }
        );

        // Send JSON response with new image URL
        return res.status(200).json({ imageUrl });

    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ error: "Server failed to save image." });
    }
});

/**
 *  GET image URL for a product by productId.
 *  Returns JSON with imageUrl or 404 if not found.
 */
app.get("/images/:productId", async (req, res) => {
    const { productId } = req.params;

    try {
        if (!productId || typeof productId !== "string") {
            return res.status(400).json({ error: "Invalid productId" });
        }

        const image = await Image.findOne({ productId: productId.trim() });
        if (!image) return res.status(404).json({ error: "Image not found." });

        return res.status(200).json({ imageUrl: image.imageUrl });

    } catch (err) {
        console.error("Fetch image error:", err);
        return res.status(500).json({ error: "Failed to retrieve image." });
    }
});
