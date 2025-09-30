import "dotenv/config";
import mongoose from "mongoose";

const DB_NAME = "image_database";

let connection = undefined;

/**
 *  Connect to MongoDB server.
 *  Specifically to the database 'image_database' within that server.
 */
async function connect() {
    try {
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
            dbName: DB_NAME,
        });
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`);
    }
}

/**
 *  Mongoose schema for storing product images.
 *  Each image links to a product by ID.
 *  
 */
const imageSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    imageUrl: {
        type: String
    },
});

const Image = mongoose.model("Image", imageSchema);

export { Image, connect };
