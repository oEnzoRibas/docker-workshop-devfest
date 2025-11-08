const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, title, done, created_at FROM todos ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title required" });
  try {
    const result = await db.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, done, created_at",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await db.query(
      "DELETE FROM todos WHERE id = $1 RETURNING id",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "not found" });
    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
