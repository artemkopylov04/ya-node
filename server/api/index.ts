import express from 'express';
import Convert from 'ansi-to-html';
import { AxiosResponse, AxiosError } from 'axios';

import { sendPush } from '../pushAPI';
import {
  getSettings,
  getBuilds,
  getBuild,
  getBuildLog,
  deleteSettings,
  postSettings,
  postRepository,
  postHash,
} from './requests';

const {
  getCache,
  send,
} = require('./apiHelpers');

const router = express.Router();
const convert = new Convert({});
const cacheLogs: any = {};

// GET
router.get('/settings', (req, res, next) => getSettings()
  .then((response: AxiosResponse) => send(res, response))
  .catch(() => next('get settings error')));

router.get('/builds', (req, res, next) => getBuilds(req.query)
  .then((response: AxiosResponse) => send(res, response))
  .catch(() => next('get all builds error')));

router.get('/builds/:buildId', (req, res, next) => getBuild(req.params)
  .then((response: AxiosResponse) => send(res, response))
  .catch((e: AxiosError) => (e.response && e.response.status === 400
    ? res.sendStatus(400)
    : next('get build error'))));

router.get('/builds/:buildId/logs', (req, res, next) => {
  const cache = getCache(req.params, cacheLogs);

  if (!cache) {
    getBuildLog(req.params)
      .then(({ data }: AxiosResponse) => {
        if (data.length > 0 && Object.keys(cacheLogs).length < 1000) {
          const log = convert.toHtml(data);

          cacheLogs[req.params.buildId] = { data: log, timeout: Date.now() };

          res.send(log);
        } else {
          res.send('');
        }
      })
      .catch((e: AxiosError) => (e.response && e.response.status === 400
        ? res.sendStatus(400)
        : next('get build error')));
  } else res.send(cache);
});

// POST
router.post('/settings', async (req, res, next) => {
  try {
    await deleteSettings();
    await postRepository(req.body);
    const response: AxiosResponse = await postSettings(req.body);
    send(res, response);
  } catch (e) {
    next('post settings error');
  }
});

router.post('/builds/:commitHash', (req, res, next) => postHash(req.params)
  .then((response: AxiosResponse) => send(res, response))
  .catch(() => next('post hash error')));

router.post('/subscription/update', (req, res, next) => {
  process.env.subscriptionObject = JSON.stringify(req.body);
  console.log(process.env.subscriptionObject);
  send(res, { status: 200, data: 'OK' });
});

router.get('/subscription/notification/:status/:id', (req, res, next) => {
  if (typeof process.env.subscriptionObject === 'string' && process.env.subscriptionObject.length > 0) {
    sendPush(JSON.parse(process.env.subscriptionObject), `${req.params.id}: status: ${req.params.status}!`)
  }
  res.sendStatus(200);
});

export = router;
