require('dotenv').config();

export let PORT = Number(process.env.PORT) || 3000;
export let DB_USER = process.env.DB_USER;
export let DB_HOST = process.env.DB_HOST;
export let DB_NAME = process.env.DB_NAME;
export let DB_PASSWORD = process.env.PASSWORD;
export let DB_PORT = Number(process.env.DB_PORT) || 5432;

export let USER = process.env.USER;
export let HOST = process.env.HOST;
export let DATABASE_NAME = process.env.DATABASE_NAME;
export let PASSWORD = process.env.PASSWORD;

export const SERVER_OK = 200;
export const SERVER_BAD_REQUEST = 400;
export const SERVER_NOT_FOUND = 404;
