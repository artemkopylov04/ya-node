const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

const config = {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
};

router.get('/settings', async (req, res) => {
    try {
        const response = await axios.get( 
            `${process.env.API_URL}/conf`,
            config
        );
        console.log(response)
        res.send(response.data);
    } catch (e) {
        next(e)
    }
});

router.get('/settings/post', async (req, res, next) => {
    try {
        const response = await axios.post( 
            `${process.env.API_URL}/conf`,
            {
                repoName: "string",
                buildCommand: "string",
                mainBranch: "string",
                period: 0
            },
            config
        );
        console.log(response);
        res.send(response.status);
    } catch (e) {
        next(e);
    }
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