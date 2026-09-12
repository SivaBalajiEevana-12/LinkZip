const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();


const {
    createUrl,
    getAllLinks,
    getLinkById,
    deleteLink,updateLink
} = require("../controller/link");

router.post("/", authMiddleware, createUrl);

router.get("/", authMiddleware, getAllLinks);

router.get("/:id",authMiddleware, getLinkById); // public

router.put("/:id", authMiddleware, updateLink);

router.delete("/:id", authMiddleware, deleteLink);

module.exports = router;