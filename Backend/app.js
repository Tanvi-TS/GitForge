console.log("app.js loaded");
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const repoRouter = require("./routes/repoRoutes");
const issueRouter = require("./routes/issueRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/repos", repoRouter);
app.use("/api", issueRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "GitForge API is running" });
});

// TEMP protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

module.exports = app;
