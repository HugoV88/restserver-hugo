/* 
=============================================================================
REST SERVER PARTE 3
=============================================================================
    1. Nos vamos para el archivo models.
*/

require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require('./routes/usuario'));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;

    console.log('Base de Datos ONLINE');
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});