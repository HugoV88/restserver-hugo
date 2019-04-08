const express = require("express"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    Usuario = require("../models/user");

const app = express();

app.post("/login", (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: "El (usuario) o contraseña son incorrectos"
            });
        } else if (!userDB) {
            res.status(400).json({
                ok: false,
                message: "El (usuario) o contraseña son incorrectos"
            });
        } else if (!bcrypt.compareSync(body.password, userDB.password)) {
            res.status(400).json({
                ok: false,
                message: "El usuario o (contraseña) son incorrectos"
            });
        } else {
            let token = jwt.sign({
                usuario: userDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            res.json({
                ok: true,
                usuario: userDB,
                token
            });
        }
    });
});

module.exports = app;