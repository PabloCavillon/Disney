const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/characters', require('./characters'));
app.use('/genders', require('./genders'));
app.use('/movies', require('./movies'));

module.exports = app;