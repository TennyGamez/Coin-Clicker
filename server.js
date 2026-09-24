const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Get the current total
app.get("/count", async (req, res) => {
  const { data, error } = await supabase
    .from("game_stats")
    .select("total_downloads")
    .eq("id", 1)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ totalDownloads: data.total_downloads });
});

// Add 1 to the total
app.post("/count", async (req, res) => {
  const { data, error } = await supabase
    .from("game_stats")
    .select("total_downloads")
    .eq("id", 1)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const newTotal = data.total_downloads + 1;

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
