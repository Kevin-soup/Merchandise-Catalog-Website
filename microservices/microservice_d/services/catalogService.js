// services/catalogService.js

import { Product } from "../catalog_model.mjs";

/**
 * Creates and saves a new product to the database.
 *
 * @param {Object} data - Object containing product fields (item_id, price, color).
 * @returns {Promise<Product>} The created product document.
 */
export async function createProduct(data) {
  const product = new Product(data);
  return product.save();
}

/**
 * Finds products matching filters and applies sorting.
 *
 * @param {Object} filters - Query filters (e.g., { color: "Black" }).
 * @param {string} sort - Sort order: "priceLowHigh" or "priceHighLow".
 * @returns {Promise<Product[]>} Array of matching products.
 */
export async function findProducts(filters, sort) {
  let products = await Product.find(filters);

  if (sort === "priceLowHigh") {
    products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sort === "priceHighLow") {
    products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  return products;
}

/**
 * Updates fields of an existing product by ID.
 *
 * @param {string} id - MongoDB product document ID.
 * @param {Object} updates - Object with updated fields.
 * @throws Throws error if product not found.
 * @returns {Promise<Product>} The updated product document.
 */
export async function updateProduct(id, updates) {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  Object.assign(product, updates);
  return product.save();
}

/**
 * Deletes a product by ID.
 *
 * @param {string} id - MongoDB product document ID.
 * @returns {Promise<Product|null>} Deleted product document or null if not found.
 */
export async function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}
