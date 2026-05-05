import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

export function requireAuth(req, res, next) {
  const authorizationHeader = req.headers.authorization ?? "";
  const bearerToken = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.slice(7) : "";
  const cookieToken = req.cookies?.token ?? "";
  const token = bearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
