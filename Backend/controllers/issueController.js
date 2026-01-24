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

//Get Single Issue

const getSingleIssue = async (req, res) => {
  try {
    const { repoId, issueId } = req.params;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res
        .status(404)
        .json({ success: false, message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const issue = await Issue.findOne({
      _id: issueId,
      repository: repoId,
    }).populate("createdBy", "username");
    if (!issue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }

    res.status(200).json({ success: true, data: issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Edit the issue 
const updateIssue = async (req, res) => {
  try {
    const { repoId, issueId } = req.params;
    const { title, description, status } = req.body;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ success: false, message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const issue = await Issue.findOne({ _id: issueId, repository: repoId });
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    if (title !== undefined) issue.title = title;
    if (description !== undefined) issue.description = description;
    if (status !== undefined) issue.status = status;

    await issue.save();

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Delete the issue 
const deleteIssue = async (req, res) => {
  try {
    const { repoId, issueId } = req.params;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ success: false, message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const issue = await Issue.findOne({ _id: issueId, repository: repoId });
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    await issue.deleteOne();

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createIssue,
  getRepoIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
};
