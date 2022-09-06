const { response } = require("express");
const sequelize = require("sequelize");
const Personaje = require("../models/Personaje");
const PersonajePelicula = require("../models/PersonajePelicula");

const get_personaje_by_id = async id => {
    
    personaje = await Personaje.findOne({where:{id}});
    return new Promise((resolve, reject) => {
        if (!personaje) reject('No existe un personaje registrado con ese id');
        resolve(personaje);
    })
}

const get_personajes_by_age = async edad => {
    
    personaje = await Personaje.findOne({where:{edad}});
    return new Promise((resolve, reject) => {
        if (!personaje) reject('No existe un personaje registrado con esa edad');
        resolve(personaje);
    })
}

const get_personaje_by_name = async nombre => {
    personaje = await Personaje.findOne({where:{nombre}});
    return new Promise((resolve, reject) => {
        if (!personaje) reject('No existe un personaje registrado con esa nombre');
        resolve(personaje);
    })
}

const get_personajes_by_idMovie =  async idMovie => {
    console.log("pase!!")
    const personajesId = await PersonajePelicula.findAll({where:{PeliculaId:idMovie}});
    const personajes = await Personaje.findAll({where:{id:personajesId}});
    return new Promise((resolve, reject) => {
        console.log(personajes)
        if (!personajes.length) reject('No existen personajes relacionados con esa pelicula');
        resolve(personajes)
    })
}

const get_personajes = async (req, res = response) => {
    
    const {id, name, age, movie} =  req.query;
    
    if ( id ) {
        return get_personaje_by_id(id)
            .then(personaje => { res.json({ personaje }) })
            .catch(err => res.status(400).json({msg: err}));
    }

    if ( name ) {
        return get_personaje_by_name(name)
            .then(personaje => { res.json({ personaje }) })
            .catch(err => res.status(400).json({msg: err}));
    }

    if ( age ) {
        return get_personajes_by_age(age)
            .then(personaje => { res.json({ personaje }) })
            .catch(err => res.status(400).json({msg: err}));
    }
    
    if ( movie ) {
        return get_personajes_by_idMovie(movie)
            .then(personajes => { res.json({ personajes }) })
            .catch(err => res.status(400).json({msg: err}));
    }

    const personajes = await Personaje.findAll({ attributes: ['nombre', 'imagen'] });
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

    await PersonajePelicula.destroy({where:{PersonajeId:id}})
    await Personaje.destroy({where:{id}});

    res.json({
        msg:'El personaje se elimino con exito'
    })
}

module.exports = {
    get_personajes,
    create_personaje,
    editar_personaje,
    delete_personaje
}