import express from "express";
import "dotenv/config";
import { db } from "./config/db.js";
import cors from "cors";
import { teamsRouter } from "./routers/teamsRouter.js";
import { playersRouter } from "./routers/playersRouter.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/teams", teamsRouter);
app.use("/players", playersRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.listen(3000, () => console.log(`Listening port 3000`));
