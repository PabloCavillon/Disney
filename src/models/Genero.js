const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Genero = db.define( 'Genero', {
    nombre: {
        type: DataTypes.STRING
    },
    imagen: {
        type: DataTypes.STRING
    }
})

module.exports = Genero; 