# 🚀 GitForge - Full Stack Version Control Platform

A lightweight, full-stack GitHub-inspired platform built with the **MERN Stack**. GitForge enables users to create repositories, manage issues, simulate Git operations through a custom CLI, and track commit history through a clean and professional dashboard.

[Features](#-features) •
[Tech Stack](#️-tech-stack) •
[Installation](#-installation) •
[Project Structure](#-project-structure) •
[API Endpoints](#-api-endpoints) •
[CLI Commands](#-cli-commands) •
[Security](#-security-features) •
[Future Enhancements](#-future-enhancements)

---

# 📖 About

GitForge is a full-stack GitHub clone that combines a web-based repository management system with a custom-built Git engine. Users can securely create repositories, manage issues, and simulate version control operations such as **init, add, commit, push, pull, and revert** through a custom CLI.

The project was built to understand the internal working of Git while recreating some of GitHub's core functionality using modern web technologies.

---

# ✨ Key Highlights

- ✅ GitHub-inspired user interface
- ✅ JWT-based authentication system
- ✅ Repository management system
- ✅ Issue tracking functionality
- ✅ Custom Git CLI implementation
- ✅ Local commit storage using `.gitforge`
- ✅ Push and pull simulation
- ✅ Commit history management
- ✅ Protected API routes
- ✅ Responsive dashboard

---

# 🚀 Features

## 🔐 Authentication & Authorization

- ✅ User registration
- ✅ User login
- ✅ Password hashing using bcrypt
- ✅ JWT token generation
- ✅ Persistent authentication using localStorage
- ✅ Protected API routes
- ✅ Automatic logout on invalid token
- ✅ Middleware-based authentication

---

## 📂 Repository Management

- ✅ Create repositories
- ✅ Repository descriptions
- ✅ Public and private repositories
- ✅ Unique repository names per user
- ✅ View personal repositories
- ✅ View repositories by username
- ✅ Repository ownership verification
- ✅ GitHub-style dashboard

---

## 🐞 Issue Tracking System

- ✅ Create issues
- ✅ View repository issues
- ✅ Get single issue details
- ✅ Update issues
- ✅ Delete issues
- ✅ Open and closed issue status
- ✅ Issue creator tracking
- ✅ Assigned user support
- ✅ Repository-based issue organization

---

## 📝 Commit Management

- ✅ Create commits
- ✅ Commit messages
- ✅ Unique commit hashes
- ✅ Retrieve repository commit history
- ✅ Commit sorting by creation time
- ✅ Owner-only commit creation

---

## ⚙️ Custom Git Engine

- ✅ `gitforge init`
- ✅ `gitforge add`
- ✅ `gitforge commit`
- ✅ `gitforge push`
- ✅ `gitforge pull`
- ✅ `gitforge revert`
- ✅ Staging area implementation
- ✅ Commit snapshots
- ✅ HEAD tracking
- ✅ Local `.gitforge` directory
- ✅ Remote repository simulation

---

## 🎨 User Interface

- ✅ GitHub-inspired design
- ✅ Responsive layout
- ✅ Dashboard page
- ✅ Repository details page
- ✅ Sidebar navigation
- ✅ Issue view
- ✅ Code view section
- ✅ Loading states
- ✅ React Context API state management
- ✅ Tailwind CSS styling

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Yargs
- UUID

---

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS

---

## Database

- MongoDB Atlas
- Mongoose ODM

---

## Authentication & Security

- JSON Web Tokens (JWT)
- bcrypt Password Hashing
- Protected Routes
- Authorization Middleware
- Request Validation
- ObjectId Validation

---

## Other Tools

- Axios Interceptors
- Context API
- Local Storage
- UUID
- Yargs CLI

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/Tanvi-TS/GitForge.git

cd GitForge
```

---

## Install Backend Dependencies

```bash
cd Backend

npm install
```

---

## Install Frontend Dependencies

```bash
cd Frontend

npm install
```

---

## Create Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Start Backend Server

```bash
cd Backend

node index.js start
```

Server runs on:

```bash
http://localhost:3000
```

---

## Start Frontend

```bash
cd Frontend

npm run dev
```

---

# 📁 Project Structure

```text
GitForge
│
├── Backend
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── repoController.js
│   │   ├── issueController.js
│   │   ├── commitController.js
│   │   ├── init.js
│   │   ├── add.js
│   │   ├── commit.js
│   │   ├── push.js
│   │   ├── pull.js
│   │   └── revert.js
│   │
│   ├── Models
│   │   ├── User.js
│   │   ├── Repo.js
│   │   ├── Issue.js
│   │   └── Commit.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── repoRoutes.js
│   │   ├── issueRoutes.js
│   │   ├── commitRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── validateBody.js
│   │   ├── validateObjectId.js
│   │   ├── checkRepoOwner.js
│   │   └── errorMiddleware.js
│   │
│   ├── app.js
│   ├── index.js
│   └── .env
│
├── Frontend
│   │
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── layouts
│   │   ├── routes
│   │   └── utils
│   │
│   └── package.json
│
└── .gitforge
    ├── commits
    ├── staging
    ├── config.json
    └── HEAD
```

---

# 🚧 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |

---

## Repositories

| Method | Endpoint |
|----------|----------|
| POST | `/api/repos/create` |
| GET | `/api/repos/my` |
| GET | `/api/repos/:username/:repoName` |
| GET | `/api/users/:username/repos` |

---

## Issues

| Method | Endpoint |
|----------|----------|
| POST | `/api/repos/:repoId/issues` |
| GET | `/api/repos/:repoId/issues` |
| GET | `/api/repos/:repoId/issues/:issueId` |
| PUT | `/api/repos/:repoId/issues/:issueId` |
| DELETE | `/api/repos/:repoId/issues/:issueId` |

---

## Commits

| Method | Endpoint |
|----------|----------|
| POST | `/api/repos/:repoId/commits` |
| GET | `/api/repos/:repoId/commits` |

---

# 💻 CLI Commands

## Initialize Repository

```bash
node index.js init
```

Creates:

```text
.gitforge/
├── commits/
├── staging/
├── config.json
└── HEAD
```

---

## Add Files

```bash
node index.js add <filename>
```

Adds files to the staging area.

---

## Commit Files

```bash
node index.js commit "commit message"
```

Creates a new snapshot and stores commit metadata.

---

## Push Commits

```bash
node index.js push
```

Copies local commits to the simulated remote repository.

---

## Pull Commits

```bash
node index.js pull
```

Synchronizes commits from the remote repository.

---

## Revert

```bash
node index.js revert <commitID>
```

Restores files from a previous commit and updates HEAD.

---

# 🔒 Security Features

- ✅ Password hashing using bcryptjs
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Authentication middleware
- ✅ Repository ownership verification
- ✅ Request body validation
- ✅ MongoDB ObjectId validation
- ✅ Global error handling middleware
- ✅ Automatic token removal on expiration
- ✅ User password exclusion from responses

---

# 🎯 Future Enhancements

- 🔍 Repository search
- ⭐ Star repositories
- 🍴 Fork repositories
- 🌿 Branch management
- 🔄 Merge functionality
- 👥 Collaborator support
- 💬 Comments on issues
- 📊 Contribution graph
- 📝 README editor
- 🔔 Notifications
- 📈 Commit activity charts
- 🌐 Repository deployment support

---

# 👩‍💻 Author

### Tanvi Saxena

🔗 GitHub: **[Tanvi-TS](https://github.com/Tanvi-TS)**

---

# ❤️ Built With

- Node.js
- Express.js
- MongoDB
- React
- Vite
- Tailwind CSS
- JWT
- bcryptjs
- Yargs

---

### ⭐ If you found this project useful, consider giving it a star!
