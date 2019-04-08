/* 
    1. Primero que todo debemos entender la autentificación por tokens. Un token se puede interpretar
como una unidad de valor que una entidad privada crea, para otorgar derechos, pagar por un trabajo o
como una puerta de entrada a determinados servicios. La utilización de tokens puede sustituir eficaz-
mente a las variables de sesiones, ya que por cada máquina se proveee un token único al usuario que facilita
la autentificación y el rendimiento del servidor.
    2. Vamos a crear ./routes/login.js y nos vamos al archivo.
    3. (4. ./server/routes/login.js) cortamos el middleware que contiene la ruta de "./routes/user" y
lo llevamos al archivo "./routes/index.js"
*/

require("./config/config");
const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require("./routes/index"));

mongoose.connect(process.env.URLDATA, { useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log("BASE DE DATOS CONECTADA");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});