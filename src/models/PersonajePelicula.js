const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const Pelicula = require("./Pelicula");
const Personaje = require("./Personaje");

const PersonajePelicula = db.define('PersonajePelicula', {
    PersonajeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Personaje,
            key: 'id'
        }
    },
    PeliculaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Pelicula,
            key: 'id' 
        }
    }
});

Personaje.belongsToMany(Pelicula, { through: PersonajePelicula });
Pelicula.belongsToMany(Personaje, { through: PersonajePelicula });


module.exports = PersonajePelicula;