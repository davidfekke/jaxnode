'use strict';
var express = require('express');
var twitterdata = require('./services/twitterdata.js');
var meetupdata = require('./services/meetuppromise.js');
var githubData = require('./services/githubdata.js');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var servicefactory = require('./services/jaxnode-service.js');

var service = servicefactory(meetupdata, twitterdata);

var routes = require('./routes/index');
var routesForApps = require('./routes/appsroutes');
var routesForApis = require('./routes/apiroutes');

var app = express();

// view engine setup
var hbs = require('express-hbs');
require('./services/hbsHelpers.js')(hbs);

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var exposeService = function (req, resp, next) {
    req.service = service;
    req.getCode = githubData;
    next();
};

app.use('/', exposeService, routes);
app.use('/apps', routesForApps);
app.use('/v1/api', exposeService, routesForApis);

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).render('404', { title: '404 Error' });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        console.log(err.message);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    console.log(err.message);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
