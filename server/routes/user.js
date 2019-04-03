const express = require("express"),
    Usuario = require("../models/user"),
    bcrypt = require("bcrypt");

const app = express();

app.get("/usuario", (req, res) => {
    let body = req.body,
        inicio = Number(req.query.inicio) || 0,
        limite = Number(req.query.limite) || 5;

    Usuario.find({ estado: true })
        .skip(inicio)
        .limit(limite)
        .exec((err, user) => {
            if (err) {
                res.status.json({
                    ok: false,
                    err
                })
            } else {
                Usuario.countDocuments({ estado: true }, (err, contador) => {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            err
                        });
                    } else {
                        res.json({
                            ok: true,
                            usuario: user,
                            conteo: contador
                        })
                    }
                })
            }
        })
});

app.post("/usuario", (req, res) => {
    let body = req.body,
        usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            })
        }
    })
});

app.put("/usuario/:id", (req, res) => {
    let id = req.params.id,
        body = req.body;

    delete body.password;
    delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                usuario: usuarioDB
            })
        }
    });
});

app.delete("/usuario/:id", (req, res) => {
    let id = req.params.id,
        cambiaStatus = {
            estado: false
        };

    Usuario.findByIdAndUpdate(id, cambiaStatus, { new: true }, (err, usuarioDel) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else if (!usuarioDel) {
            res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            })
        } else {
            res.json({
                ok: true,
                "usuario eliminado": usuarioDel
            })
        }
    })
});

module.exports = app;