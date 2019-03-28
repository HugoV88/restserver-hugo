/* 
=============================================================================
REST SERVER PARTE 2
=============================================================================
    1. Se descargan los paquetes de mongoose y se importan.
    2. Se establece conexión con la base de datos y se debe averiguar el puerto en el cmd con el siguiente
comando <db.serverCmdLineOpts()> y colocar el número en el localhost. Creamos la base de datos cafe.
    3. En la función de la conexión de base de datos creamos un callback que nos imprima en pantalla el estado.
    4. Se traslada las peticiones GET, POST, PUT y DELETE a un nuevo archivo "./routes/usuario.js" y se hacen las
respectivas importaciones. La importanción se haría por medio de "app.use" en vez del método tradicional y después de
todos los middleware.
    5. Se crea una carpeta para guardar los modelos "./models/usuario.js" y en ella se importa "mongoose".
    6. Nos vamos al archivo "/models/usuario" 
*/

require('./env/env');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extendded: false }));

app.use(bodyParser.json());

app.use(require("./routes/usuario"));

/* (2)(3) Se establece conexión con la base de datos*/
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;

    console.log("Base de Datos Online");
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto ", process.env.PORT);
});