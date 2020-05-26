// Приложение отвечающее за работу с репозиторием

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { getInfo } = require('./helpers/getInfoAboutCommit');
const { getSettings, postRequest, existsRepository } = require('./api/requests');

const { REPO_PATH, GIT_URL } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/add', async (req, res, next) => {
  try {
    const info = await getInfo(req.body.commitHash, process.env.repo);

    if (!info) throw new Error('not info');

    const build = await postRequest(req.body.commitHash, info);

    res.json(build.data);
  } catch (e) { next('add'); }
});

app.post('/clone', async (req, res, next) => {
  const { repoName } = req.body;

  try {
    await existsRepository(GIT_URL, repoName);
  } catch (e) { next('repository exists'); }

  try {
    fs.rmdirSync(process.env.REPO_PATH, { recursive: true });
    fs.mkdirSync(process.env.REPO_PATH);
  } catch (e) { next('delete local repository'); }

  try {
    await exec(`git clone ${GIT_URL}/${repoName}.git ${REPO_PATH}/${repoName}`);
    process.env.repo = repoName;
    res.sendStatus(200);
  } catch (e) { console.error(e); next('clone repository'); }
});

app.use((err, req, res) => {
  console.error(err);
  res.sendStatus(500);
});

// Пул изменений + добавление в process.env настроек
(async function pullRepo() {
  const { data } = await getSettings();

  if (data && data.data && data.data.period) {
    process.env.repo = data.data.repoName;
    process.env.period = data.data.period || 10;

    try {
      const pulled = await exec('git pull', {
        cwd: `${process.env.REPO_PATH}/${process.env.repo}`,
      });
      console.log(`Process pull: ${pulled.stdout}`);
      console.log(`Next pull : ${process.env.period} minutes`);
    } catch (e) {
      console.error(e);
      console.error('pull');
    }
  }

  setTimeout(() => {
    pullRepo();
  }, process.env.period || 10 * 60 * 1000);
}());

module.exports = app;
