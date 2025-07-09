require("dotenv").config();
const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToMongo();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

// Default route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the iNotebook backend API 🎉");
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
