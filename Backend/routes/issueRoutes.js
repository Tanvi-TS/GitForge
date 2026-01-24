const express = require("express");
const { createIssue } = require("../controllers/issueController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/repos/:repoId/issues", authMiddleware, createIssue);

module.exports = router;
