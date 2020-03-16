const express = require('express');
const { instance, authHeader } = require('../helpers/request');
require('dotenv').config();

const router = express.Router();

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

  try {
    await instance({
      method: 'delete',
      url: `${process.env.API_URL}/conf`,
      headers: authHeader,
    });

    await instance({
      method: 'post',
      url: `${process.env.REPO_URL}:${process.env.REPO_PORT}/clone`,
      data: {
        repoName,
        mainBranch,
      },
    });

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

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.get('/builds', async (req, res, next) => {
  try {
    const buildsReq = await instance({
      method: 'get',
      url: `${process.env.API_URL}/build/list`,
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

router.get('/builds/:buildId/logs', async (req, res, next) => {
  try {
    const buildLogReq = await instance({
      method: 'get',
      url: `${process.env.API_URL}/build/log?buildId=${req.params.buildId}`,
      headers: authHeader,
    });

    res.json({
      status: buildLogReq.status,
      data: buildLogReq.data,
    });
  } catch (e) {
    if (e.response.status === 400) {
      res.sendStatus(400);
    } else {
      next(e);
    }
  }
});

router.post('/builds/:commitHash', async (req, res, next) => {
  try {
    const { commitHash } = req.params;

    await instance({
      method: 'post',
      url: `${process.env.REPO_URL}:${process.env.REPO_PORT}/add`,
      data: {
        commitHash,
      },
    });

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
