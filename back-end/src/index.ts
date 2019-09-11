import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { SERVER_OK, PORT } from './constants';
import apiRouter from './routers';
import { getDB } from './db';
import { QueryResult } from 'pg';

const app: express.Application = express();

async function serverSetup() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.locals.db = await getDB();
  await app.locals.db.query(
    'create table users(ID SERIAL PRIMARY KEY, email varchar(80) UNIQUE, username varchar(50) UNIQUE, first_name varchar(50), last_name varchar(50), password text, avatar varchar(50), membership varchar(50), gender varchar(50))',
    (error: Error, results: QueryResult) => {},
  );

  // app.use('*', cloudinaryConfig);

  app.get('/', (req: Request, res: Response) => {
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
