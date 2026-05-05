import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";
import User from "../models/User.js";

const TOKEN_EXPIRY = "7d";

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    jwtSecret,
    { expiresIn: TOKEN_EXPIRY },
  );
}

function sanitizeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    const trimmedName = String(name ?? "").trim();
    const plainPassword = String(password ?? "");

    if (!trimmedName || !normalizedEmail || plainPassword.length < 6) {
      return res.status(400).json({ message: "Name, email, and a password of at least 6 characters are required" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "That email is already registered" });
    }

    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      passwordHash,
    });

    const token = createToken(user);
    return res.status(201).json({
      message: "Account created",
      token,
      user: sanitizeUser(user),
    });
  } catch {
    return res.status(500).json({ message: "Unable to create account" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    const plainPassword = String(password ?? "");

    if (!normalizedEmail || !plainPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await bcrypt.compare(plainPassword, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user);
    return res.json({
      message: "Signed in",
      token,
      user: sanitizeUser(user),
    });
  } catch {
    return res.status(500).json({ message: "Unable to sign in" });
  }
}

export function logout(_req, res) {
  return res.json({ message: "Signed out" });
}
