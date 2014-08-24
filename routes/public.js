var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Room = mongoose.model('Room');

router.post('/:room', function (request, response) {
	Room.create({ name: request.params.room }, function(error, docs) {
		if (! error) {
			status = { successful: true };
		} else {
			status = { successful: false };
		}
		
		response.end(JSON.stringify(status));
	});
})

router.get('/:room', function (request, response) {
	Room.findOne({ name: request.params.room }, function (error, doc) {
		if (! doc) {
			response.redirect('/');
		} else {
			response.render('public', { name: request.params.room} );
		}
	});
})

router.get('*', function (request, response) {
	Room.find({}, function (error, docs) {
		response.end(JSON.stringify(docs));
	})
})

module.exports = router;