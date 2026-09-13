"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = require("../models/user");
const link = require("../models/link");
const nanoid = require("nanoid");
const createUrl = async (req, res) => {
    const { originalUrl, expiresAt, customAlias } = req.body;
    const userId = req.user.id;
    const existingLink = await link.findOne({
        originalUrl,
        userId
    });
    if (existingLink) {
        return res.status(400).json({
            message: "Link already exists"
        });
    }
    const shortCode = customAlias || nanoid.nanoid(8);
    const newLink = new link({
        userId,
        originalUrl,
        shortCode,
        customAlias,
        expiresAt
    });
    await newLink.save();
    await user.findByIdAndUpdate(userId, {
        $inc: { totalLinks: 1 }
    });
    const shortUrl = `https://linkzip-2.onrender.com/c/${shortCode}`;
    return res.status(201).json({
        message: "Link created successfully",
        link: newLink,
        shortUrl
    });
};
const getAllLinks = async (req, res) => {
    const links = await link.find({
        userId: req.user.id
    });
    return res.status(200).json({
        message: "Links fetched successfully",
        links
    });
};
const getLinkById = async (req, res) => {
    const linkData = await link.findOne({
        _id: req.params.id,
        userId: req.user.id
    });
    if (!linkData) {
        return res.status(404).json({
            message: "Link not found"
        });
    }
    return res.status(200).json({
        message: "Link fetched successfully",
        link: linkData
    });
};
const deleteLink = async (req, res) => {
    const linkData = await link.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
    });
    if (!linkData) {
        return res.status(404).json({
            message: "Link not found"
        });
    }
    await user.findByIdAndUpdate(req.user.id, {
        $inc: { totalLinks: -1 }
    });
    return res.status(200).json({
        message: "Link deleted successfully"
    });
};
const updateLink = async (req, res) => {
    const { url, expiresAt } = req.body;
    const linkData = await link.findOneAndUpdate({
        _id: req.params.id,
        userId: req.user.id
    }, {
        originalUrl: url,
        expiresAt
    }, { new: true });
    if (!linkData) {
        return res.status(404).json({
            message: "Link not found"
        });
    }
    return res.status(200).json({
        message: "Link updated successfully",
        link: linkData
    });
};
module.exports = {
    createUrl,
    getAllLinks,
    getLinkById,
    deleteLink, updateLink
};
//# sourceMappingURL=link.js.map