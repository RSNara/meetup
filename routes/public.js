var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Room = mongoose.model('Room');

// make sure that if the room already exists, we simply redirect the user
router.post('/:room', function (request, response) {
	
	Room.findOne({ name: request.params.room }, function (error, doc) {

		if (! doc) {
			Room.create({ name: request.params.room }, function (error, docs) {
				var status = (! error) ? { successful: true } : { successful: false };
				response.end(JSON.stringify(status));
			});
		} 
		else {
			response.end(JSON.stringify({ exists: true }));
		}
	});

})

router.get('/:room', function (request, response) {
	Room.findOne({ name: request.params.room }, function (error, doc) {
		if (! doc) { 
			response.redirect('/'); 
		} else {
			response.render('public', { name: request.params.room});
		}
	});
})

router.get('*', function (request, response) {
	Room.find({}, function (error, docs) {
		response.end(JSON.stringify(docs));
	});
})

module.exports = router;