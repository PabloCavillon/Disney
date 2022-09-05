const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Pelicula = db.define( 'Pelicula', {
    titulo: {
        type: DataTypes.STRING
    },
    fecha_creacion: {
        type: DataTypes.DATE
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
    imagen: {
        type: DataTypes.STRING
    }
});

module.exports = Pelicula;