import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: " all fields are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email alrady exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    // const { password: _, ...safeUser } = user;
    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({ success: true, safeUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong on register",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body, "qq");

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All felds are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    const hashedRT = await bcrypt.hash(refreshToken, 10);

    existingUser.refreshToken = hashedRT;

    await existingUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = existingUser.toObject();
    return res.status(200).json({ success: true, user: safeUser, accessToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong on login",
      error: process.env.NODE_ENV === "development" ? error.message : "",
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token",
      });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || !user.refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const isMatch = await bcrypt.compare(token, user.refreshToken);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Refresh token mismatch",
      });
    }

    const newAccessToken = generateAccessToken(user);

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong on refreshAccessToken",
      error: process.env.NODE_ENV === "development" ? error.message : "",
    });
  }
};

export const logout = async (req, res) => {
  try {
    // If you store refresh token in DB, remove it
    const userId = req.user?._id; // from auth middleware

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        refreshToken: null,
      });
    }

    // If using cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: process.env.NODE_ENV === "development" ? error.message : "",
    });
  }
};
