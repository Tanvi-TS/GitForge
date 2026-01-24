const Repo = require("../Models/Repo");
const User = require("../Models/User");

const checkRepoOwner = async (req, res, next) => {
  try {
    const { username, repoName } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const repo = await Repo.findOne({
      name: repoName,
      owner: user._id,
    });

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.repo = repo;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkRepoOwner;
