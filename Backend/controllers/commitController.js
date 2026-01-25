const Commit = require("../Models/Commit");
const Repo = require("../Models/Repo");
const CustomError = require("../utils/customError");

// CREATE COMMIT
const createCommit = async (req, res, next) => {
  try {
    const { repoId } = req.params;
    const { message, hash } = req.body;
    const userId = req.user._id;

    const repo = await Repo.findById(repoId);

    if (!repo) {
      throw new CustomError("Repository not found", 404);
    }

    if (repo.owner.toString() !== userId.toString()) {
      throw new CustomError("Not allowed to commit to this repository", 403);
    }

    const commit = await Commit.create({
      message,
      hash,
      repo: repoId,
      author: userId,
    });

    res.status(201).json({
      success: true,
      data: commit,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL COMMITS OF A REPO
const getRepoCommits = async (req, res, next) => {
  try {
    const { repoId } = req.params;

    const repo = await Repo.findById(repoId);

    if (!repo) {
      throw new CustomError("Repository not found", 404);
    }

    const commits = await Commit.find({ repo: repoId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: commits.length,
      data: commits,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCommit,
  getRepoCommits,
};
