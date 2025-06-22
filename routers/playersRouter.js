import express from "express";
import { db } from "../config/db.js";

const playersRouter = express.Router();

playersRouter.get("", (req, res) => {
  const sql = `SELECT * FROM players`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.json(results);
  });
});

playersRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM players WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.json(results);
  });
});

playersRouter.post("", (req, res) => {
  const sql = `INSERT INTO players (name, surname, role) VALUES (?, ? ,?)`;
  const { name, surname, role } = req.body;

  db.query(sql, [name, surname, role], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.status(201).json(results);
  });
});

playersRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM players WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.sendStatus(204);
  });
});

export { playersRouter };
