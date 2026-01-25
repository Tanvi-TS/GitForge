const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getUserRepos } = require("../controllers/repoController");

const router = express.Router();

router.get("/:username/repos", authMiddleware, getUserRepos);

module.exports = router;
