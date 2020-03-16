// Приложение отвечающее за общение клиент - сервер

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRoute = require('./api');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', apiRoute);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).end('error');
});

app.listen(process.env.WEB_PORT, () => {
  console.log(`Listen ${process.env.WEB_PORT}`);
});
