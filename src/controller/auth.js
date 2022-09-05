const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { sendMail } = require("../helpers/sendMail");
const Usuario = require("../models/Usuario");

const login = async (req, res = response) => {
    const {username, password} = req.body;

    const user = await Usuario.findOne({
        where: {username}
    })
    // Se verifica que el usuario este registrado
    if (!user){ 
        return res.status(400).json({
            msg: 'El usuario o la contraseña es incorrecto'
        })
    }

    // Se confirma la password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'El usuario o la contraseña es incorrecto'
        })
    }

    // Se genera el token
    const token = await generarJWT(user.id, user.username);

    res.json({
        username: user.username,
        mail: user.mail,
        token
    })
}

const register = async (req, res = response) => {

    const { username, password, mail } = req.body;

    // Se verifica que el usuario no esta ya registrado
    let user = await Usuario.findOne({where:{username}})
    if (user) {
        return res.status(400).json({
            msg: 'El usuario ya ha sido registrado'
        })
    }

    // Se verifica que el mail no esta ya registrado
    user = await Usuario.findOne({where:{ mail }})
    if (user) {
        return res.status(400).json({
            msg: 'El mail ya ha sido registrado'
        })
    }

    // se encripta la contraseña antes de enviar a la BD
    const salt = bcrypt.genSaltSync();
    passcript = bcrypt.hashSync(password, salt);

    // Se crea el nuevo usuario
    user = await Usuario.create({
        username,
        password: passcript,
        mail 
    });

    // Envio de email de bienvenida
    sendMail({
        to:mail,
        from:'pabloa.cavillon@gmail.com',
        subject:'Bienvenido!',
        text:'Gracias por registrarte en mi api de disney!'
    });
    
    const token = await generarJWT(user.id, user.username);
  
    return res.json({
        username: user.username,
        mail: user.mail,
        token
    })
}

// Esta funcion se creo principalmente para evitar 
// errores en los test de registro
const unsuscribe = async (req, res = response) => {

    const { username } = req.body;

    const user = await Usuario.findOne({ where: { username } });
    if ( !user ) {
        return res.status(400).json({
            msg: 'No existe un usuario registrado con ese username'
        });
    }

    await Usuario.destroy({where:{id:user.id}});

    res.json({
        msg: 'Usuario eliminado con exito'
    })

}

module.exports = {
    login,
    register,
    unsuscribe
}