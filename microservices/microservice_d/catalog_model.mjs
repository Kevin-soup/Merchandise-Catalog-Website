import mongoose from "mongoose";
import "dotenv/config";

const DB_NAME = "product_database";

/**
 *  Connect to MongoDB server.
 *  Specifically to the database 'product_database' within that server.
 */
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
            dbName: DB_NAME
        });
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`);
    }
}

/**
 *  Defines the product schema for the catalog database.
 *  Fields:
 *    - item_id: unique numeric identifier (e.g., product code)
 *    - price: Decimal128 type, must be ≥ 0 (preserves decimal precision)
 *    - color: optional string for filtering (e.g., "Black", "Brown", "Other")
 */
const productSchema = new mongoose.Schema({
    item_id: { type: Number },
    price: { 
        type: mongoose.Schema.Types.Decimal128, 
        min: 0 
    },
    color: { type: String }
});

const Product = mongoose.model("Product", productSchema);

/**
 * Example update function to update a product’s price and other fields.
 * 
 * @param {String} id - Product document _id
 * @param {Object} updateFields - Fields to update, e.g. { price: "12.34", color: "Brown" }
 */
async function updateProduct(id, updateFields) {
    try {
        // Convert price string/number to Decimal128 if provided
        if (updateFields.price !== undefined) {
            const priceFloat = parseFloat(updateFields.price);
            if (isNaN(priceFloat) || priceFloat < 0) {
                throw new Error("Invalid price value");
            }
            updateFields.price = mongoose.Types.Decimal128.fromString(priceFloat);
        }
        // Update the document
        const updated = await Product.findByIdAndUpdate(id, updateFields, { new: true });
        return updated;
    } catch (err) {
        console.error("Failed to update product:", err);
        throw err;
    }
}

export { Product, connect, updateProduct };
