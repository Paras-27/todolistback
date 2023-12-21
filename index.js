import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskroute from "./routes/tasks.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/task", taskroute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to To-Do-List Backend</h1>");
});

app.listen("5000", () => {
  console.log("server running at port 5000");
});
