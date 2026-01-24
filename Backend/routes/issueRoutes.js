const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createIssue,
  getRepoIssues,
} = require("../controllers/issueController");

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getRepoIssues);

module.exports = router;
