const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { getLinkClicks } = require("../controller/click");

const { onClick } = require("../controller/click");

router.get("/details/:linkId", authMiddleware, getLinkClicks);
router.get("/:shortCode", onClick);

module.exports = router;