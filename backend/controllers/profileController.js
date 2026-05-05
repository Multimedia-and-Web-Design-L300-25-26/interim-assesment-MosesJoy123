import User from "../models/User.js";

function sanitizeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json({ user: sanitizeUser(user) });
  } catch {
    return res.status(500).json({ message: "Unable to fetch profile" });
  }
}

export async function updateProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const nextName = String(req.body.name ?? user.name).trim();
    const nextEmail = String(req.body.email ?? user.email).trim().toLowerCase();

    if (!nextName || !nextEmail) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const duplicateEmail = await User.findOne({ email: nextEmail, _id: { $ne: user._id } });
    if (duplicateEmail) {
      return res.status(409).json({ message: "That email is already in use" });
    }

    user.name = nextName;
    user.email = nextEmail;
    await user.save();

    return res.json({
      message: "Profile updated",
      user: sanitizeUser(user),
    });
  } catch {
    return res.status(500).json({ message: "Unable to update profile" });
  }
}
