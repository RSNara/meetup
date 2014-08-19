$(function(){

	var socket = io();

	$("#input").submit(function (e){
		socket.emit('message', $("#message").val());
		$("#message").val('');
		e.preventDefault();
	})

	socket.on('message', function(data){
		$("#messages").append("<p>" + data + "</p>")
	})

})