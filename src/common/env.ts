export const ENV = process.env.ENV || 'dev';
export const JWT_SECRET = process.env.JWT_SECRET || 'random_secret';
export const LOGGER_LEVEL = process.env.LOGGER_LEVEL || 'debug';
export const SERVER_HOST: string = process.env.SERVER_HOST || '127.0.0.1';
export const SERVER_PORT: Number = parseInt(process.env.SERVER_PORT, 10) || 6010;
