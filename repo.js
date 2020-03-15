const express = require('express');
const bodyParser = require('body-parser');

const { spawn } = require('child_process');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get('/check', (req, res) => {
    switch (process.env.repoStatus) {
        case "downloading":
            res.json({ ready: false, status: "downloading" });
            break;
        case "ready":
            res.json({ ready: true });
            break;
        default:
            res.json({ ready: false, status: "error" });
            break;
    }
});

app.get('/clone/:repoName', (req, res) => {
    res.json({"status": 200});
    process.env.repoStatus = 'downloading';
    let rmRepo, git;

    rmRepo = spawn('rm', ['-rf', './rep']).on('close', () => {  
        git = spawn('git', ['clone', `https://github.com/artemkopylov04/${req.params.repoName}`, './rep']);

        git.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        git.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        git.on('close', (code) => {
            process.env.repoStatus = 'ready';
        });
    });

    rmRepo.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    rmRepo.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
})

app.use((e, req, res) => {
    console.error(e);
    res.sendStatus(e.status);
})

app.listen(process.env.REPO_PORT, () => {
    console.log(`Listen ${process.env.REPO_PORT}`);
})