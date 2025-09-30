import { Image } from "../image_model.mjs";

/**
 * Save or update an image associated with a product.
 *
 * @param {string} productId - The product ID to link the image to.
 * @param {string} imageUrl - The URL/path of the stored image.
 * @returns {Promise<Object>} The saved or updated image document.
 */
export async function saveOrUpdateImage(productId, imageUrl) {
  return Image.findOneAndUpdate(
    { productId },
    { imageUrl },
    { upsert: true, new: true }
  );
}

/**
 * Get image URL record for a product by productId.
 *
 * @param {string} productId - Product identifier.
 * @returns {Promise<Object|null>} Image record or null if not found.
 */
export async function getImageByProductId(productId) {
  return Image.findOne({ productId: productId.trim() });
}
