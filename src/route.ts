import * as passport from 'passport';
import { asyncMiddleware } from './async_middleware';

const {
  passportAuthenicate
} = require('./utils/api_helper');

// controllers
const authController = require('./controllers/auth_controller');

export const route = (server) => {


  /**
   *
   * @api {post} /register Register
   * @apiName Register
   * @apiGroup auth
   * @apiVersion  1.0.0
   * @apiHeader (AuthHeader) {String} Content-Type application/json
   * @apiParam {String} username     Mandatory username.
   * @apiParam {String} password     Mandatory password.
   * @apiParamExample {json} Request Example:
                    {
                       username: 'user',
                       password: 'pass'
                    }
  * @apiSuccessExample {type} Success-Response:
  * {
  *     success: true,
  *     data: {
  *        user: {
  *            username: String
  *        },
  *        access_token: String
  *      }
  * }
  */
 server.post('/register', asyncMiddleware(authController.register));

  /**
   *
   * @api {post} /login Login
   * @apiName Login
   * @apiGroup auth
   * @apiVersion  1.0.0
   * @apiHeader (AuthHeader) {String} Content-Type application/json
   * @apiParam {String} username     Mandatory username.
   * @apiParam {String} password     Mandatory password.
   * @apiParamExample {json} Request Example:
                    {
                       username: 'user',
                       password: 'pass'
                    }
  * @apiSuccessExample {type} Success-Response:
  * {
  *     success: true,
  *     data: {
  *        user: {
  *            username: String
  *        },
  *        access_token: String
  *      }
  * }
  */
  server.post('/login', asyncMiddleware(authController.login));


  // server.get('/me', passport.authenticate('jwt'), asyncMiddleware(authController.me));
};
