import express from "express";
import cors from "cors";
// import moment from "moment";
// import { sign } from "./utils/jwt";
const app = express();
app.use(cors());

app.get("/", async (_, res) => {
  res.send("hello world");
});

export default app;
