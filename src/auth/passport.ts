const passport = require('passport');
const { logger } = require('./../utils/logger');
const ERRORS = require('restify-errors');
const auth = require('./auth');

import User from './../models/user';

class JwtStrategy extends passport.Strategy {
  authenticate(req: any): any {
    let token = req.headers.authorization;
    if (token === undefined) {
      this.error(new ERRORS.UnauthorizedError('Invalid access token'));
      return;
    }

    token = token.replace('Bearer ', '');
    auth.verify(token).then((user) => {
      this.success(user);
    }).catch(() => this.error(new ERRORS.UnauthorizedError('Invalid access token')));
  }
}

/**
 * Facebook Login Strategy
 */
const strategy = new JwtStrategy();

passport.use('jwt', strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
