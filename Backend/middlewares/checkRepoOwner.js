const Repo = require("../Models/Repo");
const User = require("../Models/User");
const CustomError = require("../utils/customError");

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
      return next(new CustomError("Repository not found", 404));
    }

    if (repo.owner.toString() !== req.user._id.toString()) {
    return next(new CustomError("Not authorized to access this repository", 403));
    }

    req.repo = repo;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkRepoOwner;
