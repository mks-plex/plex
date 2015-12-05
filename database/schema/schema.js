var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');

var InputSchema = new mongoose.Schema({
	inputArray: [ { type: Number } ]
});

var Input = mongoose.model('Input', InputSchema);