var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/meetup');

var Message = new Schema({
	value: 'string',
	author: 'string',
	room: { type: Schema.Types.ObjectId, ref: 'Room' }
});

var Room = new Schema({
	name: { type: 'string', unique: true },
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

mongoose.model('Room', Room);
mongoose.model('Message', Message);