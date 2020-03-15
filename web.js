const express = require('express');
const bodyParser = require('body-parser');
const apiRoute = require('./api');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRoute);

app.use((e, req, res) => {
    console.error(e);
    res.sendStatus(e.status);
})

app.listen(process.env.WEB_PORT, () => {
    console.log(`Listen ${process.env.WEB_PORT}`);
})