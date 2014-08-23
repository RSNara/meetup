function handleIO(namespace) {

	var socket = io(namespace);

	$("#toolbar").submit(function (e){
		socket.emit('message', $("#message").val());
		$("#message").val('');
		e.preventDefault();
	})

	socket.on('message', function(data){
		$("#messages").append("<p>" + data + "</p>")
	})

}