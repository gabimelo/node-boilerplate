module.exports = function(){
  var app = {};
  //http://expressjs.com/
  app.express = require('express');
  // http://www.embeddedjs.com/
  app.ejs = require('ejs');
  //https://nodejs.org/api/path.html
  app.path = require('path');
  //https://nodejs.org/api/http.html#http_http
  app.http = require('http');
  //https://github.com/expressjs/morgan
  app.morgan = require('morgan');
  //Esse é o que deixa eu usar req.body https://github.com/expressjs/body-parser
  app.bodyParser = require('body-parser');
  //https://github.com/expressjs/method-override
  app.methodOverride = require('method-override');
  //https://www.npmjs.com/package/bcryptjs
  app.bcrypt = require('bcryptjs');
  //https://github.com/auth0/node-jsonwebtoken
  app.jwt = require('jsonwebtoken');
  //arquivo de criptografia
  app.crypto = require('crypto');
  // Arquivo de configuracoes
  app.config = require('./config')(app.nodeMailer);
  // CORS
  app.cors = require('cors');
  // Moment
  app.moment = require('moment');
  // https://www.npmjs.com/package/mongoose-unique-validator
  app.uniqueValidator = require('mongoose-unique-validator');
  // https://www.npmjs.com/package/mongoose-id-validator
  app.idValidator = require('mongoose-id-validator');
  // http://caolan.github.io/async/docs.html#
  app.async = require('async');
  // https://github.com/request/request-promise
  app.requestPromise = require('request-promise');

  //Db
  var db = {};
  db.mongo = require('mongodb').MongoClient;
  db.mongoose = require('mongoose');
  db.mongoose.connect(app.config.mongoURI());
  db.mongoose.connection.on('error', console.error);
  db.mongoose.connection.db.once('open', function() {
    console.log("Mongo Connected");
  });

  //Schema
  var schema = {};
  schema.mongoose = db.mongoose;
  schema.users = require(__dirname + '/models/users.js')(db.mongoose, app.uniqueValidator, app.idValidator);

  //Modulo Authentication
  var authentication = {};
  authentication.controllers = {};
  authentication.controllers.authentication = require(__dirname +
    '/modules/authentication/authentication-controller.js')(app.jwt, app.config);

  var utils = {};
  utils.controllers = {};
  utils.controllers.utils = require(__dirname +
    '/modules/utils/utils-controller.js')(app.moment);

  var auth = {};
  auth.controllers = {};
  auth.controllers.auth = require(__dirname +
    '/modules/auth/auth-controller.js')(schema, app.bcrypt, app.jwt, app.config, utils.controllers);

  var users = {};
  users.controllers = {};
  users.controllers.users = require(__dirname +
    '/modules/users/users-controller.js')(schema, app.bcrypt, app.jwt, app.config,
    utils.controllers, app.async, app.crypto);

  //Rotas
  var routes = {};
  routes.routes = require(__dirname + '/routes/router.js')(app.express,
    routes, authentication);

  // No auth
  routes.v1_no_auth = {};
  routes.v1_no_auth.users = require(__dirname + '/routes/no-auth/users-no-auth-routes.js')(users);
  routes.v1_no_auth.auth = require(__dirname + '/routes/no-auth/auth-no-auth-routes.js')(auth);

  // Auth comum
  routes.v1_auth = {};
  routes.v1_auth.users = require(__dirname + '/routes/auth/users-auth-routes.js')(users);

  // Auth Admin
  routes.v1_auth_admin = {};
  routes.v1_auth_admin.users = require(__dirname + '/routes/admin-auth/users-admin-auth-routes.js')(users);

  return {
    app: app,
    router: routes.routes
  }
}
