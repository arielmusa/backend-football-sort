import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.listen(3000, () => console.log(`Listening port 3000`));
