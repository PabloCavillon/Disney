const { response } = require("express");
const Genero = require("../models/Genero");
const Pelicula = require("../models/Pelicula");

const get_genero = async (req, res = response) => {
    const genders = await Genero.findAll();

    res.json({
        genders
    })
}

const create_genero = async (req, res = response) => {

    const {nombre, imagen} = req.body;
    try {

        const gender = await Genero.findOne({where:{nombre}});
        
        if (gender) {
            return res.status(400).json({
                msg:'Ya existe un genero registrado con ese nombre'
            });
        }

        const new_gender = await Genero.create({nombre, imagen});

        res.json({
            genero: new_gender
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg:'Ocurrió un problema en el servidor, comuniquese con el administrador'
        });
    }
}

const update_genero = async (req, res = response) => {

    const {id, nombre, imagen} = req.body;
    console.log(id, nombre, imagen);

    const gender_check = await Genero.findOne({where:{id}});
    if (!gender_check) {
        return res.status(400).json({
            msg:'No existe un genero registrado con ese id'
        })
    }

    if (gender_check.nombre !== nombre) {
        const gender = await Genero.findOne({where:{nombre}});
        if (gender) {
            return res.status(400).json({
                msg: 'El nombre ingresado corresponde a otro genero registrado'
            })
        }
    }

    await Genero.update({nombre, imagen}, {where:{id}})

    res.json({
        msg:'El genero fue actualizado con exito'
    })
}

const delete_genero = async (req, res = response) => {

    const { id } = req.body;

    const gender = await Genero.findOne({where: {id}});

    if (!gender) {
        return res.status(400).json({
            msg:'No existe un genero registrado con ese id'
        });
    }

    const pelicula = await Pelicula.findOne({where:{GeneroId:id}})
    if (pelicula) {
        return res.status(400).json({
            msg:`El genero esta asociado a la pelicula ${pelicula.titulo}`
        })
    }

    await Genero.destroy({where:{id}});

    res.json({
        msg:'Se eliminó el genero con exito'
    });

}

module.exports = {
    get_genero,
    create_genero,
    update_genero,
    delete_genero
}