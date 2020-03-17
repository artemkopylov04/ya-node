const { spawn } = require('child_process');

// никаких хэндлеров, если что всё взорвётся (:
// по времени не успеваю

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

module.exports = { getInfo };
