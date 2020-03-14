const express = require('express');
const bodyParser = require('body-parser');
const apiRoute = require('./api');

const app = express();

app.use(bodyParser())
app.use('/api', apiRoute);

app.use((e, req, res) => {
    console.error(e);
    res.sendStatus(e.status);
})

app.listen(3000, () => {
    console.log('Listen 3000');
})