import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let payload = {};

//Prompt announcement
try {
  const message = await rl.question("Whats the announcement: ");
  payload = { message, ...payload };
} catch (err) {
  console.error(err);
}

//Prompt for expiration
try {
  const days = await rl.question("How many days until expiration?: ");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + Number(days));
  payload = { expiresAt, ...payload };
} catch (err) {
  console.error(err);
} finally {
  rl.close();
}

//Send Post request
console.log("Sending post request with JSON payload: \n", payload);
const res = await fetch("http://localhost:3000/announcement", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

console.log("-----------------------------------------------------------");
//Digest response
console.log("Status: ", res.status);
const data = await res.json();
console.log("Data: \n", data);
