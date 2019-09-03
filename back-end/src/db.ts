import {MongoClient, Db} from 'mongodb';
import {DB_NAME, DB_URL} from './constants';

let db: Promise<Db> | undefined;

async function connect() {
  const client = await new MongoClient(DB_URL, {useNewUrlParser: true});
  try {
    await client.connect();
    console.log('Database connected!');
  } catch (e) {
    console.log(e);
  }
  return client.db(DB_NAME);
}

export const getDB = async () => {
  if (db === undefined) {
    db = connect();
  }
  return db;
};
