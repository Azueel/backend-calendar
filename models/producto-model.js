const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	price: {
		type: String,
		required: true,
	},

	quantity: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},
});

module.exports = model('Producto', UsuarioSchema);
