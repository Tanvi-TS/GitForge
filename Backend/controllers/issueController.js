const Issue = require("../Models/Issue");
const Repo = require("../Models/Repo");

//Issue Creation
const createIssue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { repoId } = req.params;
    const userId = req.user._id;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (
      repo.visibility === "private" &&
      repo.owner.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not allowed to create issue in this repo" });
    }

    const issue = await Issue.create({
      title,
      description,
      repository: repoId,
      createdBy: userId,
    });

    res.status(201).json({
      message: "Issue created successfully",
      issue,
    });
  } catch (error) {
    console.error("Create issue error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//All issue of a repo 

const getRepoIssues = async (req, res) => {
  try {
    const { repoId } = req.params;
    const userId = req.user._id;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (
      repo.visibility === "private" &&
      repo.owner.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const issues = await Issue.find({ repository: repoId })
      .populate("createdBy", "username email")
      .populate("assignedTo", "username email");

    res.json({
      count: issues.length,
      issues,
    });
  } catch (error) {
    console.error("Fetch issues error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createIssue,
  getRepoIssues,
};
