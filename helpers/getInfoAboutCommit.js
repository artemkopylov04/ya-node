const { exec } = require('child_process');

// никаких хэндлеров, если что всё взорвётся (:
// по времени не успеваю

function getInfo(commitHash, repoName) {
  return new Promise((resolve, reject) => {
    const info = {};
    exec(`git log --format=%an -n 1 ${commitHash}`, { cwd: `./rep/${repoName}` }, (err, data) => {
      if (err) console.error(err);
      info.author = data.toString().trim();
      exec(`git log --format=%B -n 1 ${commitHash}`, { cwd: `./rep/${repoName}` }, (err, data) => {
        if (err) console.error(err);
        info.message = data.toString().trim();
      });
      exec(`git branch --contains ${commitHash}`, { cwd: `./rep/${repoName}` }, (err, data) => {
        if (err) console.error(err);
        info.branch = data.toString().replace('*', '').trim();
        resolve(info);
      });
    });
  });
}

module.exports = { getInfo };
