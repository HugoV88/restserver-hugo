/* 
    (1*server)
    1. Empezaremos a trabajar con el get para generar solicitudes que nos muestren los usuarios creados. Lo primero será
utilizar el método find();, el cual tendra como primer argumento las condiciones de búsqueda en un objeto, como segundo 
argumento la proyección, como tercero las diferentes opciones en un objeto, y como cuarto un callback.
    2. Creamos el modelo con el find(); en la solicitud get. Colocamos los querys skip(salta documentos), limit(expecifica 
el número de documentos que retornará) y donde meteremos el callback que maneje el error y el retorno, lo acostumbrado.
    3. Para crear los argumentos que meteremos en los parámetros de skip() y limit(), tenemos que definirlos con el
request y el query, seguido de la palabra clave. Una vez definidos los metemos en sus respectivos parámetros.
    4. Nos saltará un error de parseo porque no hemos definido las variables anteriores como número, así que definimos.
    5. Un dato útil para la consulta es mostrar el número de usuarios que hay en la base de datos. Para configurar un
conteo, tenemos que retornar la respuesta positiva con el modelo y el método count(), definiendo una variable en el
callback que utilizaremos como propiedad en el objeto. Este método debe tener el mismo argumento que el método find(); y
trabajamos un callback para los errores y respuestas que tengan incluido el parámetro de conteo.
    6. No nos interesa mostrar toda la información del usuario, así que para arreglar esto tenemos utilizar las
proyecciones del módulo find() para filtrar información, esto se manejará entre comillas.
FIN
*/

const express = require("express"),
    Usuario = require("../models/user"),
    bcrypt = require("bcrypt");

const app = express();

app.get("/usuario", (req, res) => {
    let desde = req.query.desde || 0,
        /* (3) */
        limite = req.query.limite || 5;

    desde = Number(desde); /* (4) */
    limite = Number(limite); /* (4) */

    Usuario.find({}, "nombre email") /* (6) */
        .skip(desde)
        .limit(limite)
        .exec((err, users) => { /* (2)(3) */
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                Usuario.count({}, (err, conteo) => { /* (5) */
                    res.json({
                        ok: true,
                        users,
                        "numero de usuarios": conteo
                    });
                })
            }
        });
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

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
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

app.delete("/usuario", (req, res) => {
    res.json("delete usuario");
});

module.exports = app;