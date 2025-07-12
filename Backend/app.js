require("dotenv").config();
const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;
const allowedOrigin = [
  "http://localhost:3000",
  "https://i-notebook-nine-eta.vercel.app",
];

// Connect to MongoDB
connectToMongo();

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("cors not allowed"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
