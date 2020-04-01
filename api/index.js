const express = require('express');
const Convert = require('ansi-to-html');

const { instance, authHeader } = require('../helpers/request');
require('dotenv').config();

const router = express.Router();

const convert = new Convert();

const cacheLogs = {};

router.get('/settings', async (req, res, next) => {
  try {
    const settingsReq = await instance({
      method: 'get',
      url: `${process.env.API_URL}/conf`,
      headers: authHeader,
    });

    res.json({
      status: settingsReq.status,
      data: settingsReq.data,
    });
  } catch (e) {
    next(e);
  }
});

router.post('/settings', async (req, res, next) => {
  const {
    repoName, mainBranch, buildCommand, period,
  } = req.body;

  let error;

  try {
    await instance({
      method: 'delete',
      url: `${process.env.API_URL}/conf`,
      headers: authHeader,
    });
  } catch (e) {
    error = true;
    console.error('delete conf error');
  }

  try {
    await instance({
      method: 'delete',
      url: `${process.env.REPO_URL}:${process.env.REPO_PORT}/destroy`,
    });
  } catch (e) {
    error = true;
    console.error('delete repo error');
  }

  try {
    await instance({
      method: 'post',
      url: `${process.env.REPO_URL}:${process.env.REPO_PORT}/check`,
      data: {
        repoName,
        mainBranch,
      },
    });
  } catch (e) {
    error = true;
    console.error('check repo error');
  }

  try {
    await instance({
      method: 'post',
      url: `${process.env.API_URL}/conf`,
      data: {
        repoName: repoName || 'default',
        buildCommand: buildCommand || 'default',
        mainBranch: mainBranch || 'master',
        period: period || 0,
      },
      headers: authHeader,
    });
  } catch (e) {
    error = true;
    console.error('post conf error');
  }

  if (error) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
});

router.get('/builds', async (req, res, next) => {
  try {
    const buildsReq = await instance({
      method: 'get',
      url: `${process.env.API_URL}/build/list?limit=${req.query.limit || 10}&offset=${req.query.offset || 0}`,
      headers: authHeader,
    });

    res.json({
      status: buildsReq.status,
      data: buildsReq.data,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/builds/:buildId', async (req, res, next) => {
  try {
    const buildIdReq = await instance({
      method: 'get',
      url: `${process.env.API_URL}/build/details?buildId=${req.params.buildId}`,
      headers: authHeader,
    });

    res.json({
      status: buildIdReq.status,
      data: buildIdReq.data,
    });
  } catch (e) {
    if (e.response.status === 400) {
      res.sendStatus(400);
    } else {
      next(e);
    }
  }
});


// Добавил кэш в оперативку, просрок через 5 минут
// От переполнения стоит защита на максимум 1000 записей
// правда нигде не чистится от старости
router.get('/builds/:buildId/logs', async (req, res, next) => {
  if (cacheLogs[req.params.buildId]
     && (Math.abs(cacheLogs[req.params.buildId].timeout - Date.now())) < 5 * 60 * 1000) {
    res.send(cacheLogs[req.params.buildId].data);
  } else {
    try {
      const buildLogReq = await instance({
        method: 'get',
        url: `${process.env.API_URL}/build/log?buildId=${req.params.buildId}`,
        headers: authHeader,
      });

      if (buildLogReq.data.length > 0 && Object.keys(cacheLogs).length < 1000) {
        const log = convert.toHtml(buildLogReq.data);

        cacheLogs[req.params.buildId] = { data: log, timeout: Date.now() };

        res.send(log);
      } else { res.send(''); }
    } catch (e) {
      if (e.response.status === 400) {
        res.sendStatus(400);
      } else {
        next(e);
      }
    }
  }
});

router.post('/builds/:commitHash', async (req, res, next) => {
  try {
    const { commitHash } = req.params;

    const build = await instance({
      method: 'post',
      url: `${process.env.REPO_URL}:${process.env.REPO_PORT}/add`,
      data: {
        commitHash,
      },
    });

    res.json(build.data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
