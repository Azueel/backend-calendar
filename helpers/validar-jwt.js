import jwt from 'jsonwebtoken';

const validarJWT = (req, res, next) => {
	//recibir el token

	const token = req.header('x-token');
	if (!token) {
		return res.status(401).json({
			mensaje: 'no hay token en la peticion',
		});
	}

	//si el token existe
	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
		req.id = payload.uid;
		req.nombre = payload.nombre;
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			msg: 'el token no es valido',
		});
	}

	next();
};

module.exports = { validarJWT };
