/**
 * Module dependencies.
 */
const dotenv = require('dotenv');
dotenv.config();

var express        = require('express'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    config         = require('./config'),
  routeIndex = require("./routes/index"),
  routeComments = require("./routes/comments"),
  routePosts = require("./routes/posts"),
  routeRateComments = require("./routes/ratecomments"),
  routeRoles = require("./routes/roles"),
  routeSubComments = require("./routes/subcomments"),
  routeUsers = require("./routes/users"),
  middleextraInfo = require('./middlewares/extrainfo'),
  authorizationToken = require('./middlewares/authorizationToken'),
  expressJwt = require("express-jwt");

var jwtClave = "matttavernnopassword";

mongoose.connect(config.database.url, { useMongoClient: true });
mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

var cors = require('cors');


var app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT);

  app.use(compress())
  app.use(logger('dev'))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride())

  app.use(authorizationToken.ensureAuthenticated)
  app.use(middleextraInfo.dataUser)
  .use(routeComments.routersComments)
  .use(routeIndex.routersIndex)
  .use(routePosts.routersPosts)
  .use(routeRateComments.routersRateComments)
  .use(routeRoles.routersRoles)
  .use(routeSubComments.routersSubComments)
  .use(routeUsers.routersUsers)
   .use(function(req, res) {
    res.status(404).render("404", { title: "Not Found :(" });
  });



if (app.get("env") === "development") {
  app.use(errorHandler());
}

app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
