const { response } = require("express");
const sequelize = require("sequelize");
const Personaje = require("../models/Personaje");
const PersonajePelicula = require("../models/PersonajePelicula");

const get_personajes = async (req, res = response) => {
    //const personajes = await Personaje.findAll({attributes:['nombre', 'imagen']});
    
    res.json({
        datos: req.query
    });
}

const get_personaje_by_id = async (req, res = response) => {
    console.log('id')
    const {id} =  req.query;
    
    personaje = await Personaje.findOne({where:{id}});
    if (!personaje) {
        return res.status(400).json({
            msg: 'No existe un personaje registrado con ese id'
        })
    }

    res.json({
        personaje
    });
}

const get_personajes_by_age = async (req, res = response) => {
    console.log('age')
    const {age:edad} =  req.query;
    
    personaje = await Personaje.findOne({where:{edad}});
    if (!personaje) {
        return res.status(400).json({
            msg: 'No existe un personaje registrado con esa edad'
        })
    }

    res.json({ personaje });
}

const get_personaje_by_name = async (req, res = response) => {
    console.log('name')
    
    const {name:nombre} =  req.query;
    
    personaje = await Personaje.findOne({where:{nombre}});
    if (!personaje) {
        return res.status(400).json({
            msg: 'No existe un personaje registrado con ese id'
        })
    }

    res.json({
        personaje
    });
}

const get_personajes_by_idMovie = async (req, res = response) => {
    console.log('movie')
    
    const {movie:idMovie} =  req.query;

    const personajesId = await PersonajePelicula.findAll({where:{PeliculaId:idMovie}});

    const personajes = await sequelize.query(`SELECT * FROM disney.personajes WHERE id in ${personajesId}`);

    res.json({
        personajes
    });
}

const create_personaje = async (req, res = response) => {
    const {nombre, edad, peso, historia, imagen} = req.body;
    
    const personaje = await Personaje.findOne({where: {nombre}});
    
    if (personaje) {
        return res.status(400).json({
            msg:'Ya existe un personaje con ese nombre'
        })
    }

    const new_personaje = await Personaje.create({
        nombre,
        edad,
        peso,
        historia,
        imagen
    });
    
    res.json({
        personaje: new_personaje
    })
}

const editar_personaje = async (req, res = response) => {

    const {id, nombre, edad, peso, historia, imagen} = req.body;

    let personaje_check = await Personaje.findOne({where:{id}});

    if (!personaje_check) {
        return res.status(400).json({
            msg: 'El personaje no existe'
        })
    }

    await Personaje.update({edad, peso, historia, imagen}, {where:{id}});
    const personaje = await Personaje.findOne({where:{id}});

    res.json({
        personaje
    })
}

const delete_personaje = async (req, res = response) => {
    const { id } = req.body;

    const personaje = Personaje.findOne({where:{id}});

    if (!personaje) {
        return res.status(400).json({
            error: 'El personaje a eliminar no existe'
        })
    }

    await Personaje.destroy({where:{id}});

    res.json({
        msg:'El personaje se elimino con exito'
    })
}

module.exports = {
    get_personajes,
    get_personaje_by_id,
    get_personajes_by_age,
    get_personaje_by_name,
    get_personajes_by_idMovie,
    create_personaje,
    editar_personaje,
    delete_personaje
}