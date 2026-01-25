const Issue = require("../Models/Issue");
const Repo = require("../Models/Repo");
const CustomError = require("../utils/customError");

//CREATE ISSUE
const createIssue = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { repoId } = req.params;
    const userId = req.user._id;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      throw new CustomError("Repository not found", 404);
    }

    if (
      repo.visibility === "private" &&
      repo.owner.toString() !== userId.toString()
    ) {
      throw new CustomError(
        "Not allowed to create issue in this repository",
        403,
      );
    }

    const issue = await Issue.create({
      title,
      description,
      repository: repoId,
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};

//GET ALL ISSUES OF A REPOSITORY
const getRepoIssues = async (req, res, next) => {
  try {
    const { repoId } = req.params;
    const userId = req.user._id;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      throw new CustomError("Repository not found", 404);
    }

    if (
      repo.visibility === "private" &&
      repo.owner.toString() !== userId.toString()
    ) {
      throw new CustomError("Access denied", 403);
    }

    const issues = await Issue.find({ repository: repoId })
      .populate("createdBy", "username email")
      .populate("assignedTo", "username email");

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE ISSUE
const getSingleIssue = async (req, res, next) => {
  try {
    const { repoId, issueId } = req.params;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      throw new CustomError("Repository not found", 404);
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
      throw new CustomError("Not authorized", 403);
    }

    const issue = await Issue.findOne({
      _id: issueId,
      repository: repoId,
    }).populate("createdBy", "username");

    if (!issue) {
      throw new CustomError("Issue not found", 404);
    }

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};

//UPDATE ISSUE
const updateIssue = async (req, res, next) => {
  try {
    const { repoId, issueId } = req.params;
    const { title, description, status } = req.body;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      throw new CustomError("Repository not found", 404);
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
      throw new CustomError("Not authorized", 403);
    }

    const issue = await Issue.findOne({
      _id: issueId,
      repository: repoId,
    });

    if (!issue) {
      throw new CustomError("Issue not found", 404);
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
    next(error);
  }
};

//DELETE ISSUE
const deleteIssue = async (req, res, next) => {
  try {
    const { repoId, issueId } = req.params;

    const repo = await Repo.findById(repoId);
    if (!repo) {
      throw new CustomError("Repository not found", 404);
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
      throw new CustomError("Not authorized", 403);
    }

    const issue = await Issue.findOne({
      _id: issueId,
      repository: repoId,
    });

    if (!issue) {
      throw new CustomError("Issue not found", 404);
    }

    await issue.deleteOne();

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIssue,
  getRepoIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
