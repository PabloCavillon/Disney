const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Personaje = db.define( 'Personaje', {
    nombre: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.DOUBLE
    },
    historia: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.STRING
    }
})

module.exports = Personaje;