// Приложение отвечающее за общение клиент - сервер

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const apiRoute = require('./api');

const app = express();

app.use(express.static(path.join(__dirname, process.env.STATIC_PATH)));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', apiRoute);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `${process.env.STATIC_PATH}/index.html`));
});

app.use((err, req, res) => {
  console.error(err);

  res.status(500).end('error');
});

app.listen(process.env.WEB_PORT, () => {
  console.log(`Listen ${process.env.WEB_PORT}`);
});
