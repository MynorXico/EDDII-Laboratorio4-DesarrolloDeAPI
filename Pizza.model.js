var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PizzaSchema = new Schema({
	nombre: String,
	tipoMasa: String
});

module.exports = mongoose.model('Pizza', PizzaSchema);