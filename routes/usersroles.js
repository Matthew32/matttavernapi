/**
 * Module dependencies
 */
var express = require('express'),
    controllers = require('../controllers/usersroles');

var route = "usersroles";
/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var controllerRouters = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
controllerRouters.route('/'+route)
  .get(controllers.list);
  controllerRouters.route('/'+route+'/:id')
  .get(controllers.filter);
  controllerRouters.route('/'+route)
  .post(controllers.create);
  controllerRouters.route('/'+route+'/:id')
  .put(controllers.edit);
  controllerRouters.route('/'+route+'/:id')
  .delete(controllers.remove);
exports.routersUsersRoles = controllerRouters;
