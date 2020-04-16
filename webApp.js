const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRoute = require('./api');

const app = express();

const { STATIC_PATH } = process.env;

app.use(express.static(STATIC_PATH));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', apiRoute);

app.use((req, res) => {
  res.sendFile(`${STATIC_PATH}/index.html`);
});

app.use((err, req, res) => {
  console.error(err);

  res.status(500).end('error');
});

module.exports = app;
