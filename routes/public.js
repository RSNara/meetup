var express = require('express');
var router = express.Router();

router.get('*', function(request, response) {
	response.render('meetup', {mode: 'public'});
})

module.exports = router;