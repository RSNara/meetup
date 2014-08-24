$(function(){

	$("form#meetup > input#public").click(function (e){
		roomLocation = "/public/" + $("form#meetup > input#roomName").val();
		$.post(roomLocation, function (data) {
			if (JSON.parse(data).successful) {
				window.location.href = roomLocation;
			}
		});
	});

});