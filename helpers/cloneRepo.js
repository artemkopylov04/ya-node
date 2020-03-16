const { spawn } = require('child_process');
const { instance } = require('./request');

function cloneRepo(mainBranch, repoName) {
  const clone = spawn('git', ['clone', '-b', mainBranch, `https://github.com/artemkopylov04/${repoName}.git`, `./rep/${repoName}`]);

  clone.on('close', (code) => {
    if (code === 0) {
      const log = spawn('git', ['--git-dir', `${process.env.REPOS_PATH}/.git`, 'log', '-1', '--pretty=format:"%H"']);

      log.stdout.on('data', async (data) => {
        const commitHash = data.toString().replace(new RegExp('"', 'g'), '');

        try {
          await instance({
            method: 'post',
            url: `${process.env.WEB_URL}:${process.env.WEB_PORT}/api/builds/${commitHash}`,
          });
        } catch (e) { console.error(e); }
      });
    } else if (code === 128) {
      // git pull
    }
  });
}

module.exports = { cloneRepo };
