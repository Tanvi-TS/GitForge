const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRepository,
  getMyRepos,
} = require("../controllers/repoController");
const checkRepoOwner = require("../middlewares/checkRepoOwner");
const issueRouter = require("../routes/issueRoutes");
const commitRouter = require("../routes/commitRoutes");

const router = express.Router();

router.use("/:repoId/issues", issueRouter);
router.use('/:repoId/commits', commitRouter);

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
  },
);
module.exports = router;
