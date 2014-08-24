function handleChats(namespace, room) {

	var socket = io(namespace);

	socket.emit("join request", room);

	$("form > button#send").click(function (e){
		socket.emit('message', $("form > input#message").val());
		$("form > input#message").val('');
	})

	socket.on("message", function(data){
		$("#chatHistory").append("<p>" + data + "</p>")
	})

}