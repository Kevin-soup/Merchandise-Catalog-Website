import bcrypt from "bcrypt";

const password = "";

bcrypt.hash(password, 10).then((hash) => {
    console.log("Hash:", hash);
});

