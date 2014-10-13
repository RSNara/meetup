$(function(){

	$("form#meetup input#public").click(function (e){
		roomLocation = "/public/" + $("form#meetup input#roomName").val();
		$.post(roomLocation, function (data) {
			response = JSON.parse(data);
			if (response.successful || response.exists) {
				window.location.href = roomLocation;
			}
		});
	});

});
