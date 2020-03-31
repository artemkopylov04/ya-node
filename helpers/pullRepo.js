const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { instance, authHeader } = require('./request');

async function pullRepo(repoName, period) {
  const data = await exec('git log -1 --pretty=format:%h', {
    cwd: `${process.env.REPO_PATH}/${repoName}`,
  });

  const lastHash = data.toString().trim();

  try {
    await exec('git pull', {
      cwd: `${process.env.REPO_PATH}/${repoName}`,
    });
  } catch (e) {
    const settings = await instance({
      method: 'get',
      url: `${process.env.API_URL}/conf`,
      headers: authHeader,
    });

    setTimeout(() => {
      pullRepo(settings.data.data.repoName, settings.data.data.period);
    }, period * 1000);
  }

  let hashes = await exec('git log --pretty=format:%h', {
    cwd: `${process.env.REPO_PATH}/${repoName}`,
  });

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
}

module.exports = { pullRepo };
