function handleIO(io) {
	
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
		console.log('public user connected');
		socket.on('disconnect', function() {
			console.log('public user disconnected');
		})
	})

	

}

module.exports = handleIO;