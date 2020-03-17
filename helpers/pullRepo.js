const { exec } = require('child_process');
const { instance } = require('./request');

function pullRepo(repoName, period) {
  exec('git log -1 --pretty=format:%h', { cwd: `./rep/${repoName}` }, (err, data) => {
    const lastHash = data.toString().trim();
    exec('git pull', { cwd: `./rep/${repoName}` }, (err, data) => {
      if (err) {
        console.error(err);
      }

      exec('git log --pretty=format:%h', { cwd: `./rep/${repoName}` }, async (err, hashes) => {
        hashes = hashes.split('\n');
        let i = 0;
        while (hashes[i] !== lastHash) {
          try {
            await instance({
              method: 'post',
              url: `${process.env.REPO_URL}:${process.env.REPO_PORT}/add`,
              data: {
                commitHash: hashes[i],
              },
            });
          } catch (e) { console.error(e); }
          i += 1;
        }
        setTimeout(() => {
          pullRepo(repoName, period);
        }, period * 1000);
      });
    });
  });
}

module.exports = { pullRepo };
