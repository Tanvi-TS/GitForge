const Commit = require("../Models/Commit");
const Repo = require("../Models/Repo");

// Create a commit
const createCommit = async (req, res) => {
  try {
    const { repoId } = req.params;
    const { message, hash } = req.body;
    const userId = req.user._id;

    if (!message || !hash) {
      return res.status(400).json({
        success: false,
        message: "Commit message and hash are required",
      });
    }

    const repo = await Repo.findById(repoId);

    if (!repo) {
      return res
        .status(404)
        .json({ success: false, message: "Repository not found" });
    }

    if (repo.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to commit to this repository",
      });
    }

    const commit = await Commit.create({
      message,
      hash,
      repo: repoId,
      author: userId,
    });

    res.status(201).json({ success: true, data: commit });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all commits of a repo
const getRepoCommits = async (req, res) => {
  try {
    const { repoId } = req.params;

    const repo = await Repo.findById(repoId);

    if (!repo) {
      return res
        .status(404)
        .json({ success: false, message: "Repository not found" });
    }

    const commits = await Commit.find({ repo: repoId }).sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, count: commits.length, data: commits });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createCommit, getRepoCommits };
