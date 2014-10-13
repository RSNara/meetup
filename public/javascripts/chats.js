function handleChats(namespace, room) {

	var socket = io(namespace);

	function showMessage(message){
		$("#chatHistory").append("<blockquote><p>" + message.body + "</p><footer>" + message.author + "</footer></blockquote>");
		$("#chatHistory").scrollTop($("#chatHistory")[0].scrollHeight);
	}

	$("form button#send").one("click", function () {

		socket.emit("join request", {
			room: room,
			name: $("form input#message").val()
		});

		$("form button#send").html("Send");
		$("form input#message").val("").attr("placeholder", "Enter Message");
		$("form label[for=message]").text("Enter Message:");

		$("form button#send").click(function (e){
			socket.emit('message', $("form input#message").val());
			$("form input#message").val('');
		});

	});

	$(document).keypress(function (e){
	    (e.which === 13) && $("form button#send").click();
	});

	socket.on("message", function (message){
		showMessage(message);
	});

	socket.on("chat history", function (history){
		history.forEach(showMessage);
	});

}

$(function(){

	// make #chatHistory resize with the window
	$(window).on('resize', (function resize() {
		$("#chatHistory").width($(".container").width());
		return resize;
	}()));

	// set up perfect scrollbar
	$("#chatHistory").perfectScrollbar();
});
