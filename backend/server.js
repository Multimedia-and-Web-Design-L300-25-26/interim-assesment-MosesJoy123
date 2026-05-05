import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./db.js";
import authRoutes from "./routes/auth.js";
import cryptoRoutes from "./routes/crypto.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5174";

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Coinbase clone API is running" });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/crypto", cryptoRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Unexpected server error" });
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start backend database connection.");
    console.error(error && error.message ? error.message : error);
    process.exit(1);
  }
}

startServer();
