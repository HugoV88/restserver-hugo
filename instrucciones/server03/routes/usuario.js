/* 
    (6*models)
    1. Instalamos e importamos las dependencias de bcrypt (Hay que tener en mente que para windows se instala de esta
forma: <npm install bcrypt@3.0.5).
    2. Para encriptar el password vamos a su sección y metemos el password plano en el siguiente: <bcypt.hashSync()>
que va constar de dos parámetros. El primero será la variable <req.body.password> y el segundo el número de vueltas que
dará el hash(Entre mas vueltas de más seguro es). Esta forma es síncrona y directa.
    3. Nos vamos al archivo de models.
*/

/* (1) Requires */
const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        /* (2) Para encriptar de forma segura el password */
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        /* usuarioDB.password = null;  De esta forma se puede ocultar el password pero solo su igualdad*/

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

module.exports = app