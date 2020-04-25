import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
const apiRoute = require('./api');

const app = express();

let staticPath = '/';
if (process.env.STATIC_PATH) {
  staticPath = process.env.STATIC_PATH;
} else {
  console.error('process.env.STATIC_PATH not set')
}
  app.use(express.static(staticPath));

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use('/api', apiRoute);
  
  app.use((req, res) => {
    res.sendFile(`${staticPath}/index.html`);
  });
  
  app.use((err, req: express.Request, res: express.Response) => {
    console.error(err);
  
    res.status(500).end('error');
  });



export = app;
