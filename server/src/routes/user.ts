const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    getMe
} = require("../controller/user");

const authMiddleware = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getMe);

module.exports = router;