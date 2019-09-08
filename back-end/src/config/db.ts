import { Client } from 'pg';

<<<<<<< HEAD
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from '../constants';
=======
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from './constants';
>>>>>>> 763092422e4417be4c3a2ed42d9e30834ec78d3c

export let client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
});

client.connect();
