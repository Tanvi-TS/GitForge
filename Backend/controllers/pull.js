const fs = require("fs").promises;
const path = require("path");

async function pullRepo() {
  const localRepoPath = path.resolve(process.cwd(), ".gitforge");
  const localCommitsPath = path.join(localRepoPath, "commits");

  const remoteRepoPath = path.resolve(process.cwd(), "gitforge-remote");
  const remoteCommitsPath = path.join(remoteRepoPath, "commits");

  try {
    await fs.access(remoteCommitsPath);

    await fs.mkdir(localCommitsPath, { recursive: true });

    const commitDirs = await fs.readdir(remoteCommitsPath);

    for (const commitDir of commitDirs) {
      const remoteCommitPath = path.join(remoteCommitsPath, commitDir);
      const localCommitPath = path.join(localCommitsPath, commitDir);

      try {
        await fs.access(localCommitPath);
        continue;
      } catch {}

      await fs.mkdir(localCommitPath, { recursive: true });

      const files = await fs.readdir(remoteCommitPath);

      for (const file of files) {
        const src = path.join(remoteCommitPath, file);
        const dest = path.join(localCommitPath, file);

        const stat = await fs.stat(src);
        if (stat.isFile()) {
          await fs.copyFile(src, dest);
        }
      }
    }

    console.log(`All commits successfully pulled`);
  } catch (err) {
    console.error("Error in pulling: ", err);
  }
}

module.exports = { pullRepo };
