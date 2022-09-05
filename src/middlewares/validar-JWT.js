const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }

    try {
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        
        req.uid = uid;
        req.name = name;

        next();
    } catch {
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = { validarJWT };