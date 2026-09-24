const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Get the current total
app.get("/count", async (req, res) => {
  const { data, error } = await supabase
    .from("game_stats")
    .select("id, total_downloads")
    .eq("id", 1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Counter row not found" });
  }

  res.json({ totalDownloads: data[0].total_downloads });
});

// Add 1 to the total
app.post("/count", async (req, res) => {
  const { data, error } = await supabase
    .from("game_stats")
    .select("id, total_downloads")
    .eq("id", 1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Counter row not found" });
  }

  const newTotal = data[0].total_downloads + 1;

  const { error: updateError } = await supabase
    .from("game_stats")
    .update({ total_downloads: newTotal })
    .eq("id", 1);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  res.json({ totalDownloads: newTotal });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
