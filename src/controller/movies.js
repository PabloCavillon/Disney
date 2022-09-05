const Genero = require("../models/Genero");
const GeneroPelicula = require("../models/GeneroPelicula");
const Pelicula = require("../models/Pelicula");
const Personaje = require("../models/Personaje");
const PersonajePelicula = require("../models/PersonajePelicula");
const { response } = require("../routes/movies");

const get_peliculas = async (req, res = response) => {
    const peliculas = await Pelicula.findAll();
    res.json({
        peliculas
    })
}

const create_pelicula = async (req, res = response) => {
    
    const {titulo, fecha_creacion, calificacion, imagen, id_genero} = req.body;

    try {
    const verificar_pelicula = await Pelicula.findOne({where:{titulo}});
        console.log(verificar_pelicula)    
        if (verificar_pelicula) {
            return res.status(400).json({
                msg: 'Ya existe una pelicula registrada con ese nombre'
            })
        }

        const verificar_genero = Genero.findOne({where:{id:id_genero}});

        if (!verificar_genero) {
            return res.status(400).json({
                msg: 'No hay ningún genero registrado con ese id'
            });
        }

        const new_pelicula = await Pelicula.create({
            titulo,
            fecha_creacion,
            calificacion,
            imagen,
            GeneroId:id_genero
        });
        
        await GeneroPelicula.create({ GeneroId:id_genero, PeliculaId:new_pelicula.id});

        var pelicula = await Pelicula.findOne({where:{titulo}});
        pelicula = { 
            ...pelicula.dataValues,
            genero: verificar_genero.nombre
        }

        res.json({
            pelicula
        });
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Ocurrió un error, comuniquese con un administrador'
        })
    }
}

const editar_pelicula = async (req, res = response) => {

    const { id, titulo, fecha_creacion, calificacion, imagen } = req.body;
    
    const pelicula_check = await Pelicula.findOne({where:{id}});

    if (!pelicula_check) {
        return res.status(400).json({
            msg: 'No existe pelicula registrada con ese id'
        })
    }

    await Pelicula.update({titulo, fecha_creacion, calificacion, imagen}, {where:{id}});
    const pelicula = await Pelicula.findOne({where:{id}});

    res.json({
        pelicula
    })
}

const eliminar_pelicula = async (req, res = response) => {

    const { id } = req.body;

    const pelicula_check = await Pelicula.findOne({where:{id}});

    if (!pelicula_check) {
        return res.status(400).json({
            msg: 'El id no pertenece a ninguna pelicula resgistrada'
        });
    }

    await Pelicula.destroy({where:{id}});

    res.json({
        msg: 'La pelicula fue eliminada con exito'
    })
}

const relacionar_personajes = async (req, res = response) => {

    const {id_pelicula, id_personaje} = req.body;

    const personaje = await Personaje.findOne({where:{id:id_personaje}});
    if (!personaje) {
        return res.status(400).json({
            msg: 'El id no pertenece a ningun personaje registrado'
        });
    }

    const pelicula = await Pelicula.findOne({where:{id:id_pelicula}});
    if (!pelicula) {
        return res.status(400).json({
            msg: 'El id no pertenece a niguna pelicula registrada'
        });
    }

    const relacion = await PersonajePelicula.create({
        PeliculaId:id_pelicula,
        PersonajeId:id_personaje
    });

    res.json({
        msg: 'Se armo la relacion exitosamente',
        relacion
    })

}

module.exports = {
    get_peliculas,
    create_pelicula,
    editar_pelicula,
    eliminar_pelicula,
    relacionar_personajes
}