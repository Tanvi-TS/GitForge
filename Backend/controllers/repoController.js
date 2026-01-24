const Repo = require("../Models/Repo");

exports.createRepository = async (req, res) => {
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

exports.getMyRepos = async (req, res) => {
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
