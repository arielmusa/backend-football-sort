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
  const sql = `INSERT INTO players (name, surname, role, member) VALUES (?, ? ,?, ?)`;
  const { name, surname, role, member } = req.body;
  const memberValue = member ? 1 : 0;

  db.query(sql, [name, surname, role, memberValue], (err, results) => {
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

// team_player routes
playersRouter.post("/:id/team/:teamId", (req, res) => {
  const id = req.params.id;
  const teamId = req.params.teamId;

  const checkSql = `
  SELECT team_player.*, teams.players_limit
  FROM team_player 
  LEFT JOIN teams 
  ON team_player.team_id = teams.id
  
  WHERE team_player.team_id = ?`;

  db.query(checkSql, [teamId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    const playersLimit = results[0]?.players_limit || 0;
    if (results.length > playersLimit) {
      return res
        .status(400)
        .json({ message: "Team has reached players limit" });
    }
    const checkPlayerSql = `SELECT * FROM team_player WHERE team_id = ? AND player_id = ?`;

    db.query(checkPlayerSql, [teamId, id], (err, results) => {
      if (err)
        return res.status(500).json({ message: "Database query failed" });
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "Player is already assigned to the team" });
      }
      const sql = `INSERT INTO team_player (team_id, player_id) VALUES (?,?);`;

      db.query(sql, [teamId, id], (err, results) => {
        if (err)
          return res.status(500).json({ message: "Database query failed" });
        return res.status(201).json(results);
      });
    });
  });
});
export { playersRouter };
