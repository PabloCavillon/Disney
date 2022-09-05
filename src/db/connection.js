const { Sequelize } = require('sequelize');
const fs = require('fs');

const db = new Sequelize( 
    'disney',
    'root', 
    '',
    { 
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);


module.exports = db;