const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Usuario = db.define('Usuario', {

    username: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }

})

module.exports = Usuario;