var http = require('http');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var favicon = require('serve-favicon');
var config = require('./config');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'html');
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

mongoose.connect(config.mongo.url);

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
    noCache: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var indexController = require('./controllers/indexController');
var newElectionController = require('./controllers/newElectionController');
var electionController = require('./controllers/electionController');
var voteController = require('./controllers/voteController');

app.use('/', indexController);
app.use('/nuevaEleccion', newElectionController);
app.use('/eleccion', electionController);
app.use('/votar', voteController);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var server_port = 3000;
var server_ip_address = '127.0.0.1';

var server = http.createServer(app);

server.listen(server_port, server_ip_address, function() {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});