/* 
    1. (3. config/config) Tenemos que hacer un middleware para la solicitud get y así el
usuario pueda acceder al servicio.
    2. Creamos un archivo "./middleware/authentification" y nos vamos al archivo.
*/

const express = require("express"),
    Usuario = (require("../models/user")),
    bcrypt = (require("bcrypt")),
    { verificarToken, autorizarToken } = require("../middleware/authorization"),
    app = express();

app.get("/usuario", verificarToken, (req, res) => {
    let body = req.body,
        desde = Number(req.query.desde),
        limite = Number(req.query.limite);

    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec({}, (err, userDB) => {
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

app.post("/usuario", [verificarToken, autorizarToken], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: userDB
            });
        }
    });
});

app.put("/usuario/:id", [verificarToken, autorizarToken], (req, res) => {
    let id = req.params.id,
        body = req.body;

    delete body.google;
    delete body.password;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (!userDB || userDB.estado === false) {
            res.status(400).json({
                ok: false,
                message: `El usuario con el id ${id} no se encuentra en la base de datos`
            });
        } else if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: userDB
            });
        }
    });
});

app.delete("/usuario/:id", [verificarToken, autorizarToken], (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, (err, userDB) => {
        if (!userDB || userDB.estado === false) {
            res.status(400).json({
                ok: false,
                message: `El usuario con el id ${id} no se encuentra en la base de datos`
            });
        } else if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                message: `El usuario con el id ${id} ha sido eliminado de la base de datos`
            });
        }
    });
});

module.exports = app;