const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createCommit,
  getRepoCommits,
} = require("../controllers/commitController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");

// Create commit
router.post(
  "/",
  validateBody(["message", "hash"]),
  authMiddleware,
  createCommit,
);

// Get all commits of a repo
router.get("/", authMiddleware, getRepoCommits);

module.exports = router;
