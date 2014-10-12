$(function(){
	
	// store all our functions
	var resizeCHistory;
	(resizeCHistory = function() {
		$("#chatHistory").css("height", $(window).height() - $("nav.navbar.navbar-fixed-bottom.navbar-default").outerHeight(true) - $("h1").outerHeight(true));
	})();

	$(window).on("resize", resizeCHistory);

});