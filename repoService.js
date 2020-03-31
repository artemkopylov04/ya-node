// Приложение отвечающее за работу с репозиторием

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');

const { checkRepo } = require('./helpers/checkRepo');
const { pullRepo } = require('./helpers/pullRepo');
const { getInfo } = require('./helpers/getInfoAboutCommit');
const { instance, authHeader } = require('./helpers/request');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/add', async (req, res) => {
  const { commitHash } = req.body;

  try {
    const info = await getInfo(commitHash, process.env.repo);

    if (!info) throw new Error('not info');
    const build = await instance({
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

    res.json(build.data);
  } catch (e) {
    console.error('add error');
    res.sendStatus(500);
  }
});

app.post('/check', async (req, res) => {
  const { repoName, mainBranch } = req.body;

  const code = await checkRepo(mainBranch, repoName);

  res.sendStatus(code ? 500 : 200);
});

app.delete('/destroy', (req, res) => {
  // Node 12.10
  fs.rmdirSync(process.env.REPO_PATH, { recursive: true });
  fs.mkdirSync(process.env.REPO_PATH);
  res.sendStatus(200);
});

app.use((err, req, res) => {
  res.sendStatus(500);
});

app.listen(process.env.REPO_PORT, () => {
  console.log(`Listen ${process.env.REPO_PORT}`);
});

// Пул изменений и отправка в билд
// (async () => {
//   const settings = await instance({
//     method: 'get',
//     url: `${process.env.API_URL}/conf`,
//     headers: authHeader,
//   });

//   if (settings.data.data && settings.data.data.period) {
//     process.env.repo = settings.data.data.repoName;
//     setTimeout(() => pullRepo(settings.data.data.repoName, settings.data.data.period),
//       settings.data.data.period * 1000);
//   }
// })();
