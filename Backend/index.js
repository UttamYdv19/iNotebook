const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
connectToMongo();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(5000, () => console.log("server connected"));
