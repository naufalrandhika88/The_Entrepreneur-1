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
    'create table users(ID SERIAL PRIMARY KEY, email varchar(80) UNIQUE, user_role varchar(50), full_name varchar(50), password text, avatar varchar(100), membership varchar(50), gender varchar(50))',
    (error: Error, results: QueryResult) => {},
  );

  await app.locals.db.query(
    'create table events(ID SERIAL PRIMARY KEY, event_name varchar(50) UNIQUE, category varchar(50), event_date Date, place varchar(50), price varchar(50), description varchar(100), available_seat int, image varchar(100))',
    (error: Error, results: QueryResult) => {},
  );

  await app.locals.db.query(
    'create table forums(ID SERIAL PRIMARY KEY, ID_user SERIAL REFERENCES users(ID), forum_name varchar(50), category varchar(50), description varchar(100), image varchar[], likes integer, cdate timestamptz not null default NOW(), udate timestamptz not null default NOW())',
    (error: Error, results: QueryResult) => {},
  );

  await app.locals.db.query(
    'create table comments(ID SERIAL, ID_forum SERIAL REFERENCES forums(ID), ID_user SERIAL REFERENCES users(ID), comment varchar(50), likes int, cdate timestamptz not null default NOW(), udate timestamptz not null default NOW())',
    (error: Error, results: QueryResult) => {},
  );

  await app.locals.db.query(
    'create table tickets(ID SERIAL, ID_event SERIAL REFERENCES events(ID), ID_user SERIAL REFERENCES users(ID), type varchar(50), qty int, total int, PRIMARY KEY(ID, ID_event, ID_user))',
    (error: Error, results: QueryResult) => {},
  );

  await app.locals.db.query(
    'create table inbox(ID SERIAL, ID_user SERIAL REFERENCES users(ID), message varchar(100), inbox_date Date)',
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
