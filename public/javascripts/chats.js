function handleChats(namespace, room) {

	var socket = io(namespace);

	$("form > button#send").one('click', function () {

		socket.emit("join request", {
			room: room,
			name: $("form > input#message").val()
		});

		$("form > button#send").html("Send");
		$("form > label").html("Message: ");
		$("form > input#message").val('');

		$("form > button#send").click(function (e){
			socket.emit('message', $("form > input#message").val());
			$("form > input#message").val('');
		})

	})

	$(document).keypress(function (e){
	    (e.which === 13) && $("form > button#send").click();
	})

	socket.on("message", function(data){
		$("#chatHistory").append("<div>" + data.name + ": " + data.message + "</div>")
	})

}