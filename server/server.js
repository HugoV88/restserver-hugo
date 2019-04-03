require("./config/config");
const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./routes/user"));

mongoose.connect(process.env.URLDATA, { useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log("BASE DE DATOS ONLINE");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});