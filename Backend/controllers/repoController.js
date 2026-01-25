const Repo = require("../Models/Repo");
const User = require("../Models/User");

let createRepository = async (req, res) => {
  try {
    const { name, description, visibility } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Repository name is required" });
    }

    const existingRepo = await Repo.findOne({
      name,
      owner: req.user._id,
    });

    if (existingRepo) {
      return res.status(400).json({ message: "Repository already exists" });
    }

    const repo = await Repo.create({
      name,
      description,
      visibility,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Repository created successfully",
      repository: repo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

let getMyRepos = async (req, res) => {
  try {
    const repos = await Repo.find({ owner: req.user._id });

    res.json({
      count: repos.length,
      repositories: repos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

let getUserRepos = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let repos;

    if (req.user && req.user._id.toString() === user._id.toString()) {
      repos = await Repo.find({ owner: user._id });
    } else {
      repos = await Repo.find({
        owner: user._id,
        visibility: "public",
      });
    }
    res.status(200).json({
      count: repos.length,
      repositories: repos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRepository,
  getMyRepos,
  getUserRepos,
};
