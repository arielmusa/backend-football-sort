import express from "express";
import { db } from "../config/db.js";

const teamsRouter = express.Router();

teamsRouter.get("", (req, res) => {
  const sql = `SELECT * FROM teams`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.json(result);
  });
});

teamsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM teams WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.json(results);
  });
});

teamsRouter.post("", (req, res) => {
  const { name, players_limit } = req.body;
  const sql = `INSERT INTO teams (name, players_limit) VALUES (?,?)`;

  db.query(sql, [name, players_limit], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.status(201).json(results);
  });
});

teamsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM teams WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.sendStatus(204);
  });
});

export { teamsRouter };
