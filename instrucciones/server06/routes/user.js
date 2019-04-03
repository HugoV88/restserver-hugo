/* 
    1. Comenzamos a trabajar con el delate, y para eso debemos utilizar el método "findByIdAndUpdate" aunque también
podemos utilizar el "remove/delate", pero no queremos borrar totalmente el registro.
    2. Definimos las variables del id y el body, y procedemos a utilizar el método que tendrá como primer argumento
el id, de segundo el valor que deseamos cambiar para mantener el registro, en este caso el "estado", de tercero las 
opciones que solo será para poder ver el cambio en pantalla, y de cuarto el callback.
    3. Por último argumento será el callback para traer el error y la respuesta, todo como normalmente lo hacemos, 
aunque como punto adicional configuraremos un error que nos salga cuando el id no existe.
    4. Una vez configurado y probado nuestro delete, tenemos que modificar el get para que solo busque los usuarios
activos en la base de datos.
    5. Ya está finalizada la petición delete y ahora vamos al server para explicar como desplegar todo este servicio
online.
*/

const express = require("express"),
    Usuario = require("../models/user"),
    bcrypt = require("bcrypt"),
    app = express();

app.get("/usuario", (req, res) => {
    let body = req.body,
        desde = Number(req.query.desde),
        limite = Number(req.query.limite);

    Usuario.find({ estado: true }, "nombre email estado")
        .skip(desde)
        .limit(limite)
        .exec((err, userDB) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                Usuario.countDocuments({ estado: true }, (err, cont) => {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            err
                        });
                    } else {
                        res.json({
                            ok: true,
                            usuario: userDB,
                            conteo: cont
                        });
                    }
                });
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
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
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
            });
        } else if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                message: "El usuario solicitado no existe en la Base de Datos"
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

app.delete("/usuario/:id", (req, res) => {
    let body = req.body,
        id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else if (!userDB) {
            res.status(400).json({
                ok: false,
                message: `Error, usuario con el id ${id} no se encuentra en la base de datos`
            });
        } else {
            res.json({
                ok: true,
                usuario: userDB,
                message: "El usuario ha sido eliminado satisfactoriamente"
            });
        }
    });
});

module.exports = app;