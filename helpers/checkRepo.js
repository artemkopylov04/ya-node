const { spawn, exec } = require('child_process');
const fs = require('fs');
const { instance } = require('./request');

function checkRepo(mainBranch, repoName) {
  if (!fs.existsSync(`./rep/${repoName}`)) {
    const clone = spawn('git', ['clone', `https://github.com/artemkopylov04/${repoName}.git`, `./rep/${repoName}`]);

    clone.on('close', (code) => {
      if (code === 0) {
        const log = spawn('git', ['--git-dir', `./rep/${repoName}/.git`, 'show-branch', '--sha1-name', mainBranch.toString()]);

        log.stderr.on('data', (data) => {
          process.env.ERROR_REPOS = data.toString();
        });

        log.stdout.on('data', async (data) => {
          const re = /\[(.*?)\]/g;
          const commitHashMatch = re.exec(data.toString());

          if (commitHashMatch[1]) {
            const commitHash = commitHashMatch[1];
            try {
              await instance({
                method: 'post',
                url: `${process.env.WEB_URL}:${process.env.WEB_PORT}/api/builds/${commitHash}`,
              });
            } catch (e) { console.error(e); }
          } else {
            process.env.ERROR_REPOS = data.toString();
          }
        });
      }
    });
  }
}

function pullRepo(repoName) {
  const last = spawn('git', ['--git-dir', `./rep/${repoName}/.git`, 'log', '-1', '--pretty=format:%h']);

  last.stdout.on('data', (data) => {
    const lastHash = data.toString().trim();
    exec('git pull', { cwd: `./rep/${repoName}` }, (err, data) => {
      if (err) {
        console.error(err);
      }

      exec('git log --pretty=format:%h', async (err, hashes) => {
        hashes = hashes.split('\n');
        const i = 0;
        while (hashes[i] !== lastHash) {
          try {
            await instance({
              method: 'post',
              url: `${process.env.WEB_URL}:${process.env.WEB_PORT}/api/builds/${hashes[i]}`,
            });
          } catch (e) { console.error(e); }
          i += 1;
        }
        console.log(i);
        console.log(lastHash);
      });
    });
  });
}

module.exports = { checkRepo, pullRepo };
