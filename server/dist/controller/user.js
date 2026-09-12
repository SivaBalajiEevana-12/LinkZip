"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            mobile
        });
        await newUser.save();
        const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: newUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        newUser.refreshToken = refreshToken;
        await newUser.save();
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            message: "User registered successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: "Login successful"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({
                message: "Refresh token missing"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });
        return res.status(200).json({
            message: "Token refreshed successfully"
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};
const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        return res.status(200).json({
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password -refreshToken");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    getMe
};
//# sourceMappingURL=user.js.map