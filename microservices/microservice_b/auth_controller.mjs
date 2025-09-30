import express from "express";
import bcrypt from "bcrypt";
import "dotenv/config";

// Set up express app.
const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

app.listen(PORT, () => {
    console.log(`Admin Auth Microservice running on port ${PORT}.`);
});


/**
 *  Handles "POST" method for "/auth/login" endpoint.
 * 
 *  Compares provided password with hashed password stored in .env.
 *  Sends status 200 if password matches. 
 */
app.post("/auth/login", async (req, res) => {
    const { password } = req.body;

    // Reject request if no password was provided.
    if (!password) {
        return res.sendStatus(400); 
    }

    // Compare input with password hash.
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isMatch) {
        return res.sendStatus(401); 
    }

    // Correct password. Return token.
    return res.status(200).json({ token: "authorized_admin" });
});
