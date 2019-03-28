require("./config/config")
const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./routes/user"))

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/cafe", { useNewUrlParser: true }, () => {
    console.log("BASE DE DATOS ONLINE");
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})