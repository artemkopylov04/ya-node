const express = require('express');
const apiRoute = require('./api');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

app.use('/api', apiRoute);

app.use((err, req, res) => {
    res.send(err);
})

app.listen(3000, () => {
    console.log('Listen 3000');
})