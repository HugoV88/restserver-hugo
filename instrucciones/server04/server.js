/* 
    1. Nos vamos para el archivo de routes.
*/

require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./routes/users"));

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/cafe", { useNewUrlParser: true }, () => {
    console.log("Base de Datos ONLINE!");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})