require('dotenv').config({path: __dirname + '/../.env'});

export const SERVER_OK = 200,
  SERVER_BAD_REQUEST = 400,
  SERVER_UNAUTHORIZED = 401,
  SERVER_FORBIDDEN = 403,
  SERVER_NOT_FOUND = 404,
  SERVER_ERROR = 500;

export const DB_NAME = process.env.DB_NAME || '',
  DB_URL = process.env.DB_URL || '',
  PORT = process.env.PORT || 4000,
  API_SECRET = process.env.API_SECRET || '';

export const CLOUDINARY_CLOUD_NAME = 'snapin',
  CLOUDINARY_API_KEY = '971728545691349',
  CLOUDINARY_API_SECRET = 'ZeN-rwOpgEx1izyNmCUW1X0ftbQ';
