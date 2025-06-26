import { db } from "../config/db.js";

const index = (req, res) => {
  const sql = `
  SELECT players.id AS player_id, players.name, players.surname, players.role, teams.id AS team_id, teams.name AS team_name, teams.players_limit 
  FROM teams
  LEFT JOIN team_player
  ON team_player.team_id = teams.id

  LEFT JOIN players
  ON players.id = team_player.player_id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });

    const teams = {};

    results.forEach((result) => {
      const teamId = result.team_id;
      if (!teams[teamId]) {
        teams[teamId] = {
          team_id: result.team_id,
          team_name: result.team_name,
          players_limit: result.players_limit,
          players: [],
        };
      }
      if (result.player_id !== null) {
        teams[teamId].players.push({
          id: result.player_id,
          name: result.name,
          surname: result.surname,
          role: result.role,
        });
      }
    });
    return res.json(Object.values(teams));
  });
};

const show = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM teams WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.json(results);
  });
};

const store = (req, res) => {
  const { name, players_limit } = req.body;
  const sql = `INSERT INTO teams (name, players_limit) VALUES (?,?)`;

  db.query(sql, [name, players_limit], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.status(201).json(results);
  });
};

const destroy = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM teams WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.sendStatus(204);
  });
};

export { index, show, store, destroy };
