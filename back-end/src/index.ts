import express from 'express';
import bodyParser from 'body-parser';
import {getDB} from './db';
import {PORT, SERVER_OK} from './constants';
import apiRouter from './routers';
import {cloudinaryConfig} from './cloudinarySetup';

const app: express.Application = express();

async function serverSetup() {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.locals.db = await getDB();

  app.use('*', cloudinaryConfig);

  app.get('/', (req, res) => {
    res.status(SERVER_OK);
    res.send('Accessing Back-end Success.');
  });

  app.use('/api', apiRouter);

  app.on('listening', function() {
    console.log('server is running');
  });
  app.listen(PORT, () => {
    console.log(`App is listening on http://127.0.0.1:${PORT}`);
  });
}

serverSetup();
