const express = require('express');
const Convert = require('ansi-to-html');

const {
  getSettings,
  getBuilds,
  getBuild,
  getBuildLog,
  deleteSettings,
  postSettings,
  postRepository,
  postHash,
} = require('./requests');

const {
  getCache,
  send,
} = require('./apiHelpers');

const router = express.Router();
const convert = new Convert();
const cacheLogs = {};

// GET
router.get('/settings', (req, res, next) => getSettings()
  .then((response) => send(res, response))
  .catch(() => next('get settings error')));

router.get('/builds', (req, res, next) => getBuilds(req.query)
  .then((response) => send(res, response))
  .catch(() => next('get all builds error')));

router.get('/builds/:buildId', (req, res, next) => getBuild(req.params)
  .then((response) => send(res, response))
  .catch((e) => (e.response.status === 400
    ? res.sendStatus(400)
    : next('get build error'))));

router.get('/builds/:buildId/logs', (req, res, next) => {
  const cache = getCache(req.params, cacheLogs);

  if (!cache) {
    getBuildLog(req.params, cacheLogs)
      .then(({ data }) => {
        if (data.length > 0 && Object.keys(cacheLogs).length < 1000) {
          const log = convert.toHtml(data);

          cacheLogs[req.params.buildId] = { data: log, timeout: Date.now() };

          res.send(log);
        } else {
          res.send('');
        }
      })
      .catch((e) => (e.response.status === 400
        ? res.sendStatus(400)
        : next('get build error')));
  } else res.send(cache);
});

// POST
router.post('/settings', async (req, res, next) => {
  try {
    await deleteSettings();
    await postRepository(req.body);
    const response = await postSettings(req.body);
    send(res, response);
  } catch (e) {
    next('post settings error');
  }
});

router.post('/builds/:commitHash', (req, res, next) => postHash(req.params)
  .then((response) => send(res, response))
  .catch(() => next('post hash error')));

module.exports = router;
