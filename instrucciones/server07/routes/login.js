/* 
    1. (2. ./server/server) Tenemos que crear las dependencias necesarias para generar
peticiones http y ademas sus exportaciones.
    2. Crearemos una petición post pero con una ruta de "/login".
    3. Para hacer funcionar esta petición se debe crear un middleware con la ruta del 
documento. Pero para no acumular dicha información en el servidor, crearemos un archivo
"./server/routes/index.js" donde guardaremos dichas rutas.
    4. Ahora nos vamos a server y cortamos el middleware que maneja "./routes/user"
    5. (5. ./routes/index) Para comenzar a configurar el login del usuario debemos trabajarlo
con el email y el password, así que comenzas a trabajar la petición post.
    6. Tenemos que utilizar el método "findOne" para conseguir al usuario por su email. Debemos
trabajar los errores y todo lo demás.
    7. Para poder detectar la contraseña encriptada se utilizará el método de bcrypt llamado
"compareSync" y se manejará con las declaraciones.
    8. Ahora vamos a generar el token. Primero se descargar la dependencia "jsonwebtoken" y se 
extrae el método para generar el token con la información del usuario, la firma de validación
que será un mensaje secreto, y el tiempo de expiración que estará configurado por minutos, horas,
días, meses y años.
    9. Configuramos las variables de entorno global para la expiración y la firma del token. Para
este último deberemos crear una variable de entorno en heroku para ocultarla.
    10. Nos vamos para el archivo ./config/config
*/


const express = require("express"),
    Usuario = (require("../models/user")),
    bcrypt = (require("bcrypt")),
    jwt = require("jsonwebtoken"),
    app = express();

app.post("/login", (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else if (!userDB) {
            res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        } else if (!bcrypt.compareSync(body.password, userDB.password)) {
            res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
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