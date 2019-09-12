import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { QueryResult } from 'pg';

import { SERVER_OK, PORT } from './constants';
import apiRouter from './routers';
import { getDB } from './db';
import { cloudinaryConfig } from './cloudinarySetup';

const app: express.Application = express();

async function serverSetup() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.locals.db = await getDB();
  await app.locals.db.query(
    'create table users(ID SERIAL PRIMARY KEY, email varchar(80) UNIQUE, first_name varchar(50), last_name varchar(50), password text, avatar varchar(50), membership varchar(50), gender varchar(50))',
    (error: Error, results: QueryResult) => {},
  );

  await app.locals.db.query(
    'create table events(ID SERIAL PRIMARY KEY, event_name varchar(50) UNIQUE, category varchar(50), place varchar(50), price varchar(50), description varchar(100), available_seat int, image varchar(50))',
    (error: Error, results: QueryResult) => {},
  );

  await app.locals.db.query(
    'create table user_event(ID_user SERIAL REFERENCES users(ID), ID_event SERIAL REFERENCES events(ID), PRIMARY KEY(ID_user, ID_event))',
    (error: Error, results: QueryResult) => {},
  );

  app.use('*', cloudinaryConfig);

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
