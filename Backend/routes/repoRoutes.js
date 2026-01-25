const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const validateObjectId = require("../middlewares/validateObjectId");

const {
  createRepository,
  getMyRepos,
} = require("../controllers/repoController");

const checkRepoOwner = require("../middlewares/checkRepoOwner");
const issueRouter = require("../routes/issueRoutes");
const commitRouter = require("../routes/commitRoutes");

const router = express.Router();

router.use("/:repoId/issues", validateObjectId("repoId"), issueRouter);

router.use("/:repoId/commits", validateObjectId("repoId"), commitRouter);

router.post(
  "/create",
  validateBody(["name"]),
  authMiddleware,
  createRepository,
);

router.get("/my", authMiddleware, getMyRepos);

router.get(
  "/:username/:repoName",
  authMiddleware,
  checkRepoOwner,
  (req, res) => {
    res.json({
      success: true,
      data: req.repo,
    });
  },
);

module.exports = router;
