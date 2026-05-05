import dotenv from "dotenv";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET ?? "dev-secret-change-this-in-production";
export const mongoUri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/coinbase-clone";
