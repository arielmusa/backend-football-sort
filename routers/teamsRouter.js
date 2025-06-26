import express from "express";
import { db } from "../config/db.js";
import { index, show, store, destroy } from "../controllers/teamController.js";

const teamsRouter = express.Router();

teamsRouter.get("", index);

teamsRouter.get("/:id", show);

teamsRouter.post("", store);

teamsRouter.delete("/:id", destroy);

// team_player routes
teamsRouter.get("/:id/players", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT players.* FROM team_player
    INNER JOIN players
    ON players.id = team_player.player_id
    WHERE team_id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    return res.json(results);
  });
});

export { teamsRouter };
