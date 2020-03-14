const express = require('express');
const https = require('https');
const axios = require('axios');
const { spawn } = require('child_process');
require('dotenv').config();

const instance = axios.create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
});

const router = express.Router();

const headers = { Authorization: `Bearer ${process.env.TOKEN}` };

router.get('/settings', async (req, res, next) => {
    instance({
        method: 'get',
        url: `${process.env.API_URL}/conf`,
        headers
    })
        .then((r) => {
            res.json({
                status: r.status,
                data: r.data,
            });
        })
        .catch(e => {
            next(e);
        });
});

router.post('/settings', async (req, res, next) => {

    const { repoName } = req.body;

    try {
        const git = spawn('git', ['clone', `https://github.com/artemkopylov04/${repoName}`, `/opt/${repoName}`]);

        
        git.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        git.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        git.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        
    } catch(e) {
        console.error(e);
    }
    
    instance({
        method: 'post',
        url: `${process.env.API_URL}/conf`,
        data: {
            repoName: repoName || "default",
            buildCommand: req.body.buildCommand || "default",
            mainBranch: req.body.mainBranch || "master",
            period: req.body.period || 0
        },
        headers
    })
        .then((r) => {
            res.json({
                status: r.status,
                data: r.data,
            });
        })
        .catch(e => {
            next(e);
        });
});

router.get('/builds', async (req, res) => {

});

router.get('/builds/:buildId', async (req, res) => {
    res.send(req.params.buildId);
});

router.get('/builds/:buildId/logs', async (req, res) => {
    res.send(req.params.buildId);
});

router.post('/builds/:commitHash', async (req, res) => {
  
});

module.exports = router;