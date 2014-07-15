
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var nunjucks = require('nunjucks');
var mongoose = require('mongoose');
var configs = require('./configs.json');

mongoose.connect(configs.mongodb);

var app = express()
	.disable('x-powered-by')
	.use(require('morgan')('dev'))
	.use(require('multer')({dest:__dirname + '/uploads'}))
	//.use(require('method-override'))
	.use(require('express-session')({ secret: '48fans', cookie: {path: '/', httpOnly: true, domain:'.48fans.com'}}))
	.use(express.static(__dirname + '/public'))
	.use(require('./index.js')());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// init nunjucks filter
require('./views/filters.js')(nunjucks);

switch (app.get('env')){
case 'development':// development only
	app.set('debug', true);
	break;
case 'production':// production only
default:
	app.set('debug', false);
}

if ('development' == app.get('env')) {
	app.use(require('errorhandler')());
}

var server = http.createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function(){
	console.log('Express server listening on port ' + port);
});

