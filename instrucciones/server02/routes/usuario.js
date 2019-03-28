/* 
=============================================================================
(4*server) SOLICITUDES
=============================================================================
    (5*routes)
    1. Se importa el archivo "../models/usuario" en una variable capitalizada.
    2. Se agrega en la solicitud POST una variable usuario que contendrá el constructor del archivo models. Se remodela
toda la estructura de la validación de datos con el nuevo constructor que estamos trabajando. 
    4. Recuerda importar este archivo al server y después de los demás middleware para que pueda cargarlos.
    3. Finaliza la parte del proyecto.
*/


const express = require('express');
const Usuario = require("../models/usuario");

const app = express();

app.get('/usuario', (req, res) => {
    res.json("get Usuario");
});

/* (2) Se crea el constructor del archivo models como uno nuevo */
app.post('/usuario', (req, res) => {
    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    /* 
    Se convierte en que lo que está arriba
    if (req.body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            usuario: req.body.nombre,
            edad: req.body.edad,
            email: req.body.email
        })
    } */
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        usuario: id
    });
});

app.delete('/usuario', (req, res) => {
    res.json("delete Usuario");
});

module.exports = app