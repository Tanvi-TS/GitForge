const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createCommit,
  getRepoCommits,
} = require("../controllers/commitController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createCommit);
router.get("/", authMiddleware, getRepoCommits);

module.exports = router;
