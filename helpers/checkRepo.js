const { exec } = require('child_process');
const fs = require('fs');
const { instance } = require('./request');

function checkRepo(mainBranch, repoName) {
  if (!fs.existsSync(`./rep/${repoName}`)) {
    exec(`git clone https://github.com/artemkopylov04/${repoName}.git ./rep/${repoName}`, (err, data) => {
      if (err) console.error(err);
      exec(`git show-branch --sha1-name ${mainBranch.toString()}`, { cwd: `./rep/${repoName}` }, async (err, data) => {
        if (err) console.error(err);
        const re = /\[(.*?)\]/g;
        const commitHashMatch = re.exec(data.toString());
        if (commitHashMatch[1]) {
          const commitHash = commitHashMatch[1];
          try {
            process.env.repo = repoName;
            await instance({
              method: 'post',
              url: `${process.env.REPO_URL}:${process.env.REPO_PORT}/add`,
              data: {
                commitHash,
              },
            });
          } catch (e) { console.error(e); }
        } else {
          process.env.ERROR_REPOS = data.toString();
        }
      });
    });
  }
}

module.exports = { checkRepo };
