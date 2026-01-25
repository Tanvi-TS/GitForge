const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const validateObjectId = require("../middlewares/validateObjectId");

const {
  createIssue,
  getRepoIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");

const router = express.Router({ mergeParams: true });

// Create issue
router.post("/", validateBody(["title"]), authMiddleware, createIssue);

// Get all issues of a repo
router.get("/", authMiddleware, getRepoIssues);

// Get single issue
router.get(
  "/:issueId",
  validateObjectId("issueId"),
  authMiddleware,
  getSingleIssue,
);

// Update issue
router.put(
  "/:issueId",
  validateObjectId("issueId"),
  authMiddleware,
  updateIssue,
);

// Delete issue
router.delete(
  "/:issueId",
  validateObjectId("issueId"),
  authMiddleware,
  deleteIssue,
);

module.exports = router;
