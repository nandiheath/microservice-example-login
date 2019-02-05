import * as restify from 'restify';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { ERROR_SERVER_EXCEPTION } from './utils/api_error';

// Get the env variables
dotenv.config();

import logger from './utils/logger';
import { route } from './route';
import {
  LOGGER_LEVEL,
} from './common/env';

// use the passport
import './auth/passport';

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0',
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(passport.initialize());

//
if (LOGGER_LEVEL === 'debug') {
  server.use((req, res, next) => {
    logger.debug(req);
    next();
  });
}

route(server);

// Catch the errors and format the response
server.on('restifyError', (req, res, err, callback) => {
  logger.debug(err.message);
  logger.debug(err.stack);
  err.toJSON = function customToJSON() {
    return {
      success: false,
      error_code: err.code || ERROR_SERVER_EXCEPTION,
      error_message: err.message,
    };
  };
  err.toString = function customToString() {
    return {
      success: false,
      error_code: err.code || ERROR_SERVER_EXCEPTION,
      error_message: 'Internal Server Error',
    };
  };
  return callback();
});

server.listen(1337, () => {
  logger.info(`${server.name} listening at ${server.url}`);
});

export default server;
