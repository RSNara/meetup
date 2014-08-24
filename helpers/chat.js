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

		socket.on('join request', function(room) {
			socket.room = room || socket.id;
			socket.join(socket.room);
		})

		socket.on('disconnect', function() {
			console.log('public user disconnected');
		})

		socket.on('message', function(data) {
			socket.to(socket.room).emit('message', data);
		})
	})

}

module.exports = handleChat;