var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/meetup');

mongoose.model('Room', new Schema({
	name: { type: String, unique: true }
}));