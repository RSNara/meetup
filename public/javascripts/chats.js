function handleChats(namespace, room) {

	var socket = io(namespace);

	function showMessage(message){
		$("#chatHistory").append("<div>" + message.author + ": " + message.body + "</div>")
	}

	$("form > button#send").one('click', function () {

		socket.emit("join request", {
			room: room,
			name: $("form > input#message").val()
		});

		$("form > button#send").html("Send");
		$("form > label").html($("form > input#message").val() + ": ");
		$("form > input#message").val('');

		$("form > button#send").click(function (e){
			socket.emit('message', $("form > input#message").val());
			$("form > input#message").val('');
		})

	})

	$(document).keypress(function (e){
	    (e.which === 13) && $("form > button#send").click();
	})

	socket.on("message", function (message){
		showMessage(message);
	})

	socket.on("chat history", function (history){
		history.forEach(showMessage);
	})

}