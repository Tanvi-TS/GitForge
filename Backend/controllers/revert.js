const fs = require("fs").promises;
const path = require("path");

async function revertRepo(commitId) {
  const repoPath = path.resolve(process.cwd(), ".gitforge");
  const commitsPath = path.join(repoPath, "commits");
  const headPath = path.join(repoPath, "HEAD");

  try {
    const commitDir = path.join(commitsPath, commitId);
    const files = await fs.readdir(commitDir);

    for (const file of files) {
      const src = path.join(commitDir, file);
      const dest = path.join(process.cwd(), file);

      const stat = await fs.stat(src);

      if (stat.isFile()) {
        await fs.copyFile(src, dest);
      }
    }

    await fs.writeFile(headPath, commitId);

    console.log(`Reverted to commit ${commitId}`);
  } catch (err) {
    console.error("Error in revert:", err.message);
  }
}

module.exports = { revertRepo };
