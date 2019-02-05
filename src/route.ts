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
   * @api {post} /auth/facebook Facebook Login
   * @apiName FacebookLogin
   * @apiGroup auth
   * @apiVersion  1.0.0
   * @apiHeader (AuthHeader) {String} Content-Type application/json
   * @apiParamExample {json} Request Example:
                     {
                       access_token: ''
                    }
  * @apiSuccessExample {type} Success-Response:
  * {
  *     success: true,
  *     data: {
  *        user: {
  *            id: String,
  *            username: String
  *        },
  *        token: String
  *      }
  * }
  */
  server.post('/login', asyncMiddleware(authController.login));


  /**
   *
   * @api {post} /auth/facebook Facebook Login
   * @apiName FacebookLogin
   * @apiGroup auth
   * @apiVersion  1.0.0
   * @apiHeader (AuthHeader) {String} Content-Type application/json
   * @apiParamExample {json} Request Example:
                     {
                       access_token: ''
                    }
  * @apiSuccessExample {type} Success-Response:
  * {
  *     success: true,
  *     data: {
  *        user: {
  *            id: String,
  *            username: String
  *        },
  *        token: String
  *      }
  * }
  */
  server.post('/register', asyncMiddleware(authController.register));
  // server.get('/me', passport.authenticate('jwt'), asyncMiddleware(authController.me));
};
