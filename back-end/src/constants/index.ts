require('dotenv').config();

export let PORT = Number(process.env.PORT) || 3000;
export let DB_USER = process.env.DB_USER;
export let DB_HOST = process.env.DB_HOST;
export let DB_NAME = process.env.DB_NAME;
export let DB_PASSWORD = process.env.PASSWORD;
export let DB_PORT = Number(process.env.DB_PORT) || 5432;
export let DATABASE_URL =
  'postgres://ebdfqstkmebzpu:17eb5132e46f16cfc11291c582ca483e553b2babaa09d4ddeefaa54d2121fa13@ec2-174-129-253-1.compute-1.amazonaws.com:5432/d5abdcu228tlpf';

export let USER = process.env.USER;
export let HOST = process.env.HOST;
export let DATABASE_NAME = process.env.DATABASE_NAME;
export let PASSWORD = process.env.PASSWORD;

export const SERVER_OK = 200;
export const SERVER_BAD_REQUEST = 400;
export const SERVER_NOT_FOUND = 404;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const API_SECRET = process.env.API_SECRET || '';
