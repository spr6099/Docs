import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookiePrser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import eventRouter from "./routes/event.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookiePrser());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);

app.get("/", (req, res) => {
  res.send("API connected");
});

app.listen(PORT, () => {
  console.log(`Backend connected on port ${PORT}`);
});
