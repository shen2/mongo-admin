/*
 * GET index page.
 */
var mongoose = require('mongoose');
var models = mongoose.models;

exports.index = function(req, res, next){
	res.render('index.html', {
		models : mongoose.models
	});
};
