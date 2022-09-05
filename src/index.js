const express = require ('express');
const db = require('./db/connection');
const cors = require('cors');
require('dotenv').config();

const app = express();

(async () => {
    try {
		await db.authenticate();
		await db.sync();
	} catch (error) {
		throw new Error(error);
	}
})()

app.use(cors());
app.use(express.json()); 

app.use(require('./routes/index'));

app.listen(process.env.PORT)

module.exports = app