import 'dotenv/config';

export const CRYPT_SALT = process.env.CRYPT_SALT || '10';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
export const TOKEN_REFRESH_EXPIRE_TIME = process.env.TOKEN_REFRESH_EXPIRE_TIME;

export const LOG_LEVEL =
  +process.env.LOG_LEVEL < 0
    ? 0
    : +process.env.LOG_LEVEL > 4
    ? 4
    : +process.env.LOG_LEVEL;
export const FILE_SIZE = process.env.FILE_SIZE;
export const IS_LOG_CHECK = process.env.IS_LOG_CHECK;
