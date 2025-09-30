import express from "express";
import "dotenv/config";
import { connect } from "./catalog_model.mjs";
import * as catalogService from "./services/catalogService.js";
import { authCheck } from "./utility/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

/**
 * Connect to MongoDB and start the server.
 */
app.listen(PORT, async () => {
  await connect();
  console.log(`Product Catalog service running on port ${PORT}...`);
});

/**
 * POST /products
 * Protected route: Creates a new product.
 */
app.post("/products", authCheck, async (req, res) => {
  try {
    const product = await catalogService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "item_id must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /products
 * Public route: Retrieves products with optional filters and sorting.
 */
app.get("/products", async (req, res) => {
  const { color, sort, search } = req.query;
  const filters = {};

  if (color) filters.color = color;
  if (search && !isNaN(parseInt(search))) filters.item_id = parseInt(search);

  try {
    const products = await catalogService.findProducts(filters, sort);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /products/:id
 * Protected route: Updates a product by ID.
 */
app.put("/products/:id", authCheck, async (req, res) => {
  try {
    await catalogService.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: "Product updated." });
  } catch (err) {
    if (err.message === "Product not found") {
      return res.sendStatus(404);
    }
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /products/:id
 * Protected route: Deletes a product by ID.
 */
app.delete("/products/:id", authCheck, async (req, res) => {
  try {
    const deleted = await catalogService.deleteProduct(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
