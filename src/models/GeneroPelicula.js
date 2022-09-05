const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const Genero = require("./Genero");
const Pelicula = require("./Pelicula");

const GeneroPelicula = db.define('GeneroPelicula', {
    GeneroId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genero,
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
})

Genero.belongsToMany(Pelicula, { through:GeneroPelicula });
Pelicula.belongsTo(Genero, { through:GeneroPelicula });

module.exports = GeneroPelicula; 