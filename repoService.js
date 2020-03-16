// Приложение отвечающее за работу с репозиторием

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { cloneRepo } = require('./helpers/cloneRepo');
const { getInfo } = require('./helpers/getInfoAboutCommit');
const { instance, authHeader } = require('./helpers/request');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/add', async (req, res, next) => {
  const { commitHash } = req.body;

  const info = await getInfo(commitHash);

  await instance({
    method: 'post',
    url: `${process.env.API_URL}/build/request`,
    data: {
      commitHash,
      commitMessage: info.message,
      branchName: info.branch,
      authorName: info.author,
    },
    headers: authHeader,
  });
});

app.post('/clone', (req, res) => {
  const { repoName, mainBranch } = req.body;

  res.sendStatus(200);

  cloneRepo(mainBranch, repoName);
});

app.use((err, req, res, next) => {
  console.error(err);

  res.sendStatus(500);
});

app.listen(process.env.REPO_PORT, () => {
  console.log(`Listen ${process.env.REPO_PORT}`);
});
