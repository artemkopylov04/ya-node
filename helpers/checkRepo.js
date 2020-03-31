const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const { instance } = require('./request');

async function checkRepo(mainBranch, repoName) {
  if (!fs.existsSync(`${process.env.REPO_PATH}/${repoName}`)) {
    try {
      await instance({
        method: 'get',
        url: `${process.env.GIT_URL}/${repoName}`,
      });
    } catch (e) {
      if (e.response.status === 404) return 1;
    }
    try {
      await exec(`git clone ${process.env.GIT_URL}/${repoName}.git ${process.env.REPO_PATH}/${repoName}`);
      await exec(`git show-branch --sha1-name ${mainBranch.toString()}`, {
        cwd: `${process.env.REPO_PATH}/${repoName}`,
      });
      process.env.repo = repoName;
      return 0;
    } catch (e) { console.error('checkRepoError'); }
  }
  return 1;
}

module.exports = { checkRepo };
