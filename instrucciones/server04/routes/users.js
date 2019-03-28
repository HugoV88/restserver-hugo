/* 
    (1*server)
    1. Ahora tenemos que trabajar en el put para poder buscar al usuario por id y también poderlo actualizar. Para esto
vamos a buscar información en la librería de mongoose y encontraremos dos opciones, "findById()" y "findByIdAndUpdate()".
El primero tiene más proceso pero también es más personalizado, ya que podemos configurar el error. El segundo no tiene
tanta personalización pero es más fácil de trabajar. 
    2. Procedemos a tomar el objeto "Usuario" y trabajarlo con el método "findByIdAndUpdate". Los argumentos serán el 
parámetro id, el objeto body, las diferentes opciones dentro de un objeto y el callback con su error y respuesta.
    3. En las opciones tenemos a "new" que nos actualiza la información en pantalla y al instante, y "runValidators" para
que las validaciones que hicimos a nuestro modelo se respeten.
    4. Se tienen que quitar del put lo que son el password y el google. Esta vez lo haré por medio de delete que sirve
para eliminar propiedades y métodos. Pero es recomendable que si hay demasiado formulario, utilizar la librería de 
underscore.js y utilizar el método pick.
FIN
*/

const express = require("express");
const Usuario = require("../models/users");
const bcrypt = require("bcrypt");

const app = express();

app.get("/usuario", (req, res) => {
    res.json("get usuario!!!");
});

app.post("/usuario", (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

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
    let id = req.params.id;
    let body = req.body;

    delete body.password;
    delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { /* (2)(3) */
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    })
});

app.delete("/usuario", (req, res) => {
    res.json("delete usuario");
});



module.exports = app;