import util from 'util';
const exec = util.promisify(require('child_process').exec);

async function getInfo(commitHash: string, repoName: string) {
  try {
    const author = await exec(`git log --format=%an -n 1 ${commitHash}`, {
      cwd: `${process.env.REPO_PATH}/${repoName}`,
    });

    const message = await exec(`git log --format=%B -n 1 ${commitHash}`, {
      cwd: `${process.env.REPO_PATH}/${repoName}`,
    });

    const branch = await exec(`git branch --contains ${commitHash}`, {
      cwd: `${process.env.REPO_PATH}/${repoName}`,
    });

    return {
      author: author.stdout.trim(),
      message: message.stdout.trim(),
      branch: branch.stdout.replace('*', '').trim(),
    };
  } catch (e) {
    console.error('get info error');
    console.error(e);
    return false;
  }
}

module.exports = { getInfo };
