console.log("app.js loaded");

const express = require("express");
const cors = require("cors");

const app = express();

// Routes
const authRouter = require("./routes/authRoutes");
const repoRouter = require("./routes/repoRoutes");
const issueRouter = require("./routes/issueRoutes");
const userRouter = require("./routes/userRoutes");

// Middlewares
const authMiddleware = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/repos", repoRouter);
app.use("/api/repos", issueRouter);
app.use("/api/users", userRouter);

//HEALTH CHECK ROUTE
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "GitForge API is running",
  });
});

//TEMP PROTECTED ROUTE
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "You are authorized",
    user: req.user,
  });
});

app.use(errorHandler);

module.exports = app;
