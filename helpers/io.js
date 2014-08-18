function io(server) {
	// socket.io 
	server.on('connection', function(socket) {
	    
	    console.log('user connected!');
	    
	    socket.on('disconnect', function() {
	        console.log('user disconnected!');
	    })

	    socket.on('message', function(data){
	        console.log(data);
	    })
	})
}

module.exports = io;