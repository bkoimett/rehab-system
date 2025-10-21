require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Books");

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get('/api/books', async (req,res) => {
    try {
        const data = await Book.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occured while fetching books."});
    }
})

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
