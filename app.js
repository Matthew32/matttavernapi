/**
 * Module dependencies.
 */

var routes = [
  "index",
  "dateregistered",
  "daterequired",
  "hourstypes",
  "hourstypes",
  "permissions",
  "roles",
  "rolespermissions",
  "users",
  "usersmeta",
  "usersroles"
];

var routesClasses = [];

for (i = 0 ; i < routes.length ; i++){

  routesClasses[i] = require('./routes/'+routes[i]);

}

var express        = require('express'),
    path           = require('path'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    favicon        = require('static-favicon'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    config         = require('./config')

mongoose.connect(config.database.url);
mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

var app = express();



/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app
  .use(compress())
  .use(favicon())
  .use(logger('dev'))
  .use(bodyParser())
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'public')))
  .use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found :('});
  });

  for (i = 0 ; i < routesClasses.length ; i++){
    app.use(routesClasses[i].routers);
  }

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
