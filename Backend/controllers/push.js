const fs = require("fs").promises;
const path = require("path");

async function pushRepo() {
  const localRepoPath = path.resolve(process.cwd(), ".gitforge");
  const localCommitsPath = path.join(localRepoPath, "commits");

  const remoteRepoPath = path.resolve(process.cwd(), "gitforge-remote");
  const remoteCommitsPath = path.join(remoteRepoPath, "commits");

  try {
    await fs.mkdir(remoteCommitsPath, { recursive: true });
    const commitDirs = await fs.readdir(localCommitsPath);

    for (const commitDir of commitDirs) {
      const localCommitPath = path.join(localCommitsPath, commitDir);

      const remoteCommitPath = path.join(remoteCommitsPath, commitDir);

      await fs.mkdir(remoteCommitPath, { recursive: true });

      const files = await fs.readdir(localCommitPath);

      for (const file of files) {
        const src = path.join(localCommitPath, file);
        const dest = path.join(remoteCommitPath, file);
        await fs.copyFile(src, dest);
      }
    }

    console.log(`All commits successfully pushed`);
  } catch (err) {
    console.error("Error in pushing: ", err);
  }
}

module.exports = { pushRepo };
