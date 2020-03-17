const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  next()
})

app.use('/static', express.static(`${__dirname}/css`, {
  etag: false,
}));
app.use('/static', express.static(`${__dirname}/svg`, {
  etag: false,
}));

app.get('*', (req, res, next) => {
  const page = req.path.replace('/', '');

  const htmlPath = path.resolve(__dirname, 'html', `${page}.html`);
  const footerPath = path.resolve(__dirname, 'html', `footer.html`);
  
  if (fs.existsSync(htmlPath)) {
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
    } catch(e) {
      next(e);
    }
  } else res.redirect('/start'); 
});

app.use((err, req, res) => {
  res.send(err);
})

app.listen(3000, () => { console.log('Listening 3000 port'); });