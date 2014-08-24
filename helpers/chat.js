var mongoose = require('mongoose');

var Room = mongoose.model('Room');
var Message = mongoose.model('Message');

function handleChat(io) {
	
	// two seperate namespaces for the private and public connections
	var privateIO = io.of('/private');
	var publicIO = io.of('/public');

	privateIO.on('connection', function(socket) {
		console.log('private user connected!');
		socket.on('disconnect', function() {
			console.log('private user disconnected');
		})
	})

	publicIO.on('connection', function(socket) {
		
		socket.room = socket.id;
		socket.name = socket.id;

		socket.on('join request', function(options) {
			socket.room = new String(options.room || socket.id);
			socket.name = new String(options.name || socket.id);

			Room.findOne({ name: socket.room }, function(error, doc){
				socket.room.id = doc._id;
			});

			socket.join(socket.room);
		})

		socket.on('disconnect', function() {
			console.log('public user disconnected');
		})

		socket.on('message', function(data) {

			//console.log(socket.room.id);

			/* save the message */
			Message.create({ 
				author: socket.name, 
				value: data, 
				room: socket.room.id 
			}, function (error, doc) {
				if (error) return error;
				Room.update({ name: socket.room }, {
					$push: { messages: doc._id }
				}, function (error, number_modified) {
					if (error) return error;
				});
			});

			/* emit the message */
			socket.to(socket.room).emit('message', { 
				name: socket.name, 
				message: data
			})
		})
	})

}

module.exports = handleChat;