// Приложение отвечающее за общение клиент - сервер

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const apiRoute = require('./api');
require('dotenv').config();

const app = express();

app.use('/static', express.static(`${__dirname}/frontend/css`));
app.use('/static', express.static(`${__dirname}/frontend/svg`));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', apiRoute);

app.use((req, res, next) => {
  const page = req.path.replace('/', '');

  const htmlPath = path.resolve(__dirname, 'frontend/html', `${page}.html`);
  const footerPath = path.resolve(__dirname, 'frontend/html', 'footer.html');

  if (fs.existsSync(htmlPath) && !(page === 'footer')) {
    try {
      const content = fs.readFileSync(htmlPath);
      const footer = fs.readFileSync(footerPath);

      res.send(`
      <!doctype html>
      <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
            <link rel="stylesheet" href="/static/index.css">
          </head>
          <body>
          ${content}
          ${footer}
          </body>
      </html>`);
    } catch (e) {
      next(e);
    }
  } else res.redirect('/start');
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).end('error');
});

app.listen(process.env.WEB_PORT, () => {
  console.log(`Listen ${process.env.WEB_PORT}`);
});
