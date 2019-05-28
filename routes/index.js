/**
 * Module dependencies
 */
var express = require('express'),
    controllers = require('../controllers/index');

/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var indexRouter = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
indexRouter.route('/')
.all(controllers.index);
indexRouter.route('/login')
.post(controllers.login);


exports.routersIndex = indexRouter;
