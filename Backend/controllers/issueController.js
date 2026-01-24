const Issue = require("../Models/Issue");
const Repo = require("../Models/Repo");

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

module.exports = {
  createIssue,
};
