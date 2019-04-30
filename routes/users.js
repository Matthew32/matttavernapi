/**
 * Module dependencies
 */
var express = require('express'),
    controllers = require('../controllers/users');

/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var usersRouters = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
usersRouters.route('/users')
  .get(controllers.list);
  usersRouters.route('/users/:id')
  .get(controllers.filter);
  usersRouters.route('/users')
  .post(controllers.create);
  usersRouters.route('/users/:id')
  .put(controllers.edit);
  usersRouters.route('/users/:id')
  .delete(controllers.remove);
exports.routers = usersRouters;
