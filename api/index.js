const express = require('express');
const { instance, databaseRequest } = require('../helpers/requests');
require('dotenv').config();

const router = express.Router();

router.get('/settings', (req, res, next) => {
    databaseRequest(req, res, next, {
        method: 'get',
        url: `${process.env.API_URL}/conf`,
    });
});

router.post('/settings', (req, res, next) => {
    const { repoName } = req.body;

    instance({
        method: 'get',
        url: `http://127.0.0.1:${process.env.REPO_PORT}/clone/${repoName}`,
    }).then((res) => {
        databaseRequest(req, res, next, {
            method: 'post',
            url: `${process.env.API_URL}/conf`,
            data: {
                repoName: repoName || "default",
                buildCommand: req.body.buildCommand || "default",
                mainBranch: req.body.mainBranch || "master",
                period: req.body.period || 0
            }
        });
    })
    .catch(e => next(e));
});

router.get('/builds', async (req, res, next) => {
    databaseRequest(req, res, next, {
        method: 'get',
        url: `${process.env.API_URL}/builds/list?offset=${req.query.offset || 0}`,
    });
});

router.get('/builds/:buildId', async (req, res, next) => {
    databaseRequest(req, res, next, {
        method: 'get',
        url: `${process.env.API_URL}/builds/details?buildId=${req.params.buildId}`,
    });
});

router.get('/builds/:buildId/logs', async (req, res, next) => {
    databaseRequest(req, res, next, {
        method: 'get',
        url: `${process.env.API_URL}/builds/log?buildId=${req.params.buildId}`,
    });
});

router.post('/builds/:commitHash', async (req, res, next) => {
    
});

module.exports = router;