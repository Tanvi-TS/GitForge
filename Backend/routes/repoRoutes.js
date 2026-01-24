const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRepository } = require("../controllers/repoController");
const { getMyRepos } = require("../controllers/repoController");
const checkRepoOwner = require("../middlewares/checkRepoOwner");

const router = express.Router();

router.post("/create", authMiddleware, createRepository);
router.get("/my", authMiddleware, getMyRepos);
router.get(
  "/:username/:repoName",
  authMiddleware,
  checkRepoOwner,
  (req, res) => {
    res.json({
      message: "Repository access granted",
      repo: req.repo,
    });
  }
);


module.exports = router;
