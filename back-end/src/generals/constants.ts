require('dotenv').config();

export let PORT = Number(process.env.PORT) || 3000;
export let DB_PORT = Number(process.env.DB_PORT) || 5432;
export let USER = process.env.USER;
export let HOST = process.env.HOST;
export let DATABASE_NAME = process.env.DATABASE_NAME;
export let PASSWORD = process.env.PASSWORD;
