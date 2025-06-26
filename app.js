import express from "express";
import "dotenv/config";
import { db } from "./config/db.js";
import cors from "cors";
import { teamsRouter } from "./routers/teamsRouter.js";
import { playersRouter } from "./routers/playersRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/teams", teamsRouter);
app.use("/players", playersRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.listen(3000, `0.0.0.0`, () => console.log(`Listening port 3000`));
