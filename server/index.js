require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json("Hello Mate");
});

// wildcard 404 handler
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT} ✅`);
});
