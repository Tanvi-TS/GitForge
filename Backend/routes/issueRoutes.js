const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createIssue,
  getRepoIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
} = require("../controllers/issueController");

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getRepoIssues);
router.get("/:issueId", authMiddleware, getSingleIssue); 
router.put("/:issueId", authMiddleware, updateIssue);
router.delete("/:issueId", authMiddleware, deleteIssue);

module.exports = router;
