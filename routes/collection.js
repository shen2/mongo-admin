/*
 * GET index page.
 */
var mongoose = require('mongoose');
var models = mongoose.models;

exports.index = function(req, res, next){
	var limit = 30, page = parseInt(req.query.page || 1);
	
	var collection = models[req.params.collection];
	
	collection.find({
			//is_duplicated:0,
		})
		.skip((page - 1) * limit)
		.limit(limit)
		//.sort('-replied_at')
		.exec(callback1);
	
	function callback1(err, rowList){
		rowList.map(function(row){
			var cols = [];
			for(var key in collection.schema.paths){
				var path = collection.schema.paths[key];
				cols.push({key : path.path, val: row.get(path.path), type : path.instance});
			}
			row.cols = cols;
			
			return row;
		});
		res.render('collection.html', {
			rowList : rowList,
			cols	: collection.schema.paths,
			pager : {
				current : page,
				total : rowList.length == limit ? Math.ceil(1000 / limit) : page
			}
		});
	}
};

exports.new = function(req, res, next){
	var collection = models[req.params.collection];
	
	var cols = [];
	for(var key in collection.schema.paths){
		var path = collection.schema.paths[key];
		cols.push({key : path.path, val: '', type : path.instance});
	}
	
	res.render('new.html', {
		cols : cols,
	});
};
