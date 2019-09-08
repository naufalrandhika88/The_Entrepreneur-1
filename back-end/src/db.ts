import { Client } from 'pg';

import {
  DB_PORT,
  USER,
  HOST,
  DATABASE_NAME,
  PASSWORD,
} from './generals/constants';

export let client = new Client({
  user: USER,
  host: HOST,
  database: DATABASE_NAME,
  password: PASSWORD,
  port: DB_PORT,
});

client.connect();
