import { Pool } from 'pg';

import {
  DB_PORT,
  USER,
  HOST,
  DATABASE_NAME,
  PASSWORD,
  DATABASE_URL,
} from './constants';

let db: Promise<Pool> | undefined;

const connectionString = DATABASE_URL;

let localConfig = {
  user: USER,
  host: HOST,
  database: DATABASE_NAME,
  password: PASSWORD,
  port: DB_PORT,
};

async function connect() {
  let client = new Pool(localConfig);
  try {
    let client = new Pool(
      // comment this if you want to use heroku database <------
      // localConfig,

      //comment this if you want to use localhost database <------
      {
        connectionString,
        ssl: true,
      },
    );
    await client.connect();
    console.log('Database connected!');

    return client;
  } catch (e) {
    console.log(e);
  }
  return client;
}

export const getDB = async () => {
  if (db === undefined) {
    db = connect();
  }
  return db;
};
