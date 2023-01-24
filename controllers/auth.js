const express = require('express');
const Usuario = require('../models/usuario-model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = express.response) => {
	const { email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({
			email,
		});
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Un usuario ya existe con ese correo',
			});
		}

		usuario = new Usuario(req.body);

		//encriptar Contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		//guardar usuario en la base de datos
		await usuario.save();

		//generar jwt
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

const loginUsuario = async (req, res = express.response) => {
	const { email, password } = req.body;
	try {
		const usuario = await Usuario.findOne({
			email,
		});
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe con ese email',
			});
		}

		//confirmar passwords
		const validPassword = bcrypt.compareSync(password, usuario.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'password incorrecto',
			});
		}

		//Generar nuestro JWT
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

const revalidarToken = async (req, res = express.response) => {
	const uid = req.uid;
	const name = req.name;

	//Generar nuestro JWT
	const token = await generarJWT(uid, name);
	res.json({
		ok: true,
		token,
	});
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
