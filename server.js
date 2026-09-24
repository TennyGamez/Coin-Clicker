const express = require("express");
const app = express();

app.use(express.json());

let totalDownloads = 0;

app.post("/count", (req, res) => {
  totalDownloads++;
  res.json({ totalDownloads });
});

app.get("/count", (req, res) => {
  res.json({ totalDownloads });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
