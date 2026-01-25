const Repo = require("../Models/Repo");
const User = require("../Models/User");
const CustomError = require("../utils/customError");

//CREATE REPOSITORY
const createRepository = async (req, res, next) => {
  try {
    const { name, description, visibility } = req.body;

    const existingRepo = await Repo.findOne({
      name,
      owner: req.user._id,
    });

    if (existingRepo) {
      throw new CustomError("Repository already exists", 400);
    }

    const repo = await Repo.create({
      name,
      description,
      visibility,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: repo,
    });
  } catch (error) {
    next(error);
  }
};

//GET MY REPOSITORIES
const getMyRepos = async (req, res, next) => {
  try {
    const repos = await Repo.find({ owner: req.user._id });

    res.status(200).json({
      success: true,
      count: repos.length,
      data: repos,
    });
  } catch (error) {
    next(error);
  }
};

//GET USER REPOSITORIES
const getUserRepos = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      throw new CustomError("User not found", 404);
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
      success: true,
      count: repos.length,
      data: repos,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRepository,
  getMyRepos,
  getUserRepos,
};
