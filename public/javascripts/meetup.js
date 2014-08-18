	
	var socket = io();

	$("#input").submit(function (e){
		socket.emit('message', $("#message").val());
		$("#message").val('');
		e.preventDefault();
	})