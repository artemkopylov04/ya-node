const { spawn } = require('child_process');
const { instance } = require('./requests');

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

function getInfo(commitHash) {
  return new Promise((resolve, reject) => {
    const info = {};
    const author = spawn('git', ['log', '--format=%an', '-n', '1', commitHash]);

    author.stdout.on('data', (data) => {
      info.author = data.toString().trim();

      const message = spawn('git', ['log', '--format=%B', '-n', '1', commitHash]);

      message.stdout.on('data', (data) => {
        info.message = data.toString().trim();

        const branch = spawn('git', ['branch', '--contains', commitHash]);

        branch.stdout.on('data', (data) => {
          info.branch = data.toString().replace('*', '').trim();

          resolve(info);
        });
      });
    });
  });
}

module.exports = { cloneRepo, getInfo };
