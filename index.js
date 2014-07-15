var express = require('express');

module.exports = function(){
	var router = express.Router();
	var indexRoutes = require('./routes/index');
	var collectionRoutes = require('./routes/collection');
	var ajaxRoutes = require('./routes/ajax');
	
	router.get('/', indexRoutes.index);
	
    router.get('/collections/:collection', collectionRoutes.index);
    router.get('/collections/:collection/new', collectionRoutes.new);

    router.get('/ajax/:collection/:id', ajaxRoutes.get);
    router.get('/ajax/:collection', ajaxRoutes.list);
    router.delete('/ajax/:collection/:id', ajaxRoutes.delete);

    return router;
};
