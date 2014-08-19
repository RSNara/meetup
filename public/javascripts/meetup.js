function handleIO(namespace) {

	var socket = io(namespace);

	$("#input").submit(function (e){
		socket.emit('message', $("#message").val());
		$("#message").val('');
		e.preventDefault();
	})

	socket.on('message', function(data){
		$("#messages").append("<p>" + data + "</p>")
	})

}