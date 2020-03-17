// Приложение отвечающее за работу с репозиторием

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const { spawn } = require('child_process');

const { checkRepo, pullRepo } = require('./helpers/checkRepo');
const { getInfo } = require('./helpers/getInfoAboutCommit');
const { instance, authHeader } = require('./helpers/request');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/add', async (req, res, next) => {
  const { commitHash } = req.body;

  const checkCommit = spawn('git', ['show', commitHash.toString()]);

  checkCommit.on('close', async (code) => {
    if (code === 0) {
      try {
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

        res.sendStatus(200);
      } catch (e) { res.sendStatus(500); }
    } else {
      res.sendStatus(500);
    }
  });
});

app.post('/check', (req, res) => {
  const { repoName, mainBranch } = req.body;

  res.sendStatus(200);

  checkRepo(mainBranch, repoName);
});

app.delete('/destroy', (req, res) => {
  // Node 12.10
  fs.rmdirSync('./rep', { recursive: true });
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  console.error(err);

  res.sendStatus(500);
});

app.listen(process.env.REPO_PORT, () => {
  console.log(`Listen ${process.env.REPO_PORT}`);
});

// Пул изменений и отправка в билд
(async () => {
  const settings = await instance({
    method: 'get',
    url: `${process.env.API_URL}/conf`,
    headers: authHeader,
  });

  if (settings.data.data && settings.data.data.period) {
    setInterval(() => pullRepo(settings.data.data.repoName), settings.data.data.period * 1000);
  }
})();
