/* 
    1. (2. ./routes/user) Empezamos a construir el middleware que autorizará el token. Para
esta función le pondremos tres argumentos (req, res, next).
    2. Para poder trabajar con el token que se encuentra en el header de nuestra petición, tendremos
que crear una variable que tenga como objeto el "req", método "get" y argumento el nombre de la llave
que tiene nuestro token.
    3. Ahora tenemos que hacer la respectiva importación en el "./routes/user", ponemos esta función
de middleware como segundo argumento de la petición get, y probamos con algún mensaje personalizado en
un console.log() o con una respuesta.
    4. Ya probado nuestro middleware ahora tenemos que utilizar el tercer argumento next() que sirve 
para saltar al get.
    5. Importamos la librería de jwt para empezar a validar el token.
    6. Trabajamos con el objeto jwt y el método "verify" que tendrá tres argumentos. El primero será
la variable del token del header de la petición, el segundo será la semilla de autentificación y el
tercero un callback que contendrá un error y la respuesta codificada.
    7. Trabajamos el error y con else igualamos lo que es el usuario de request con el usuario de la
respuesta del callback, además colocamos el método next(); para que ejecute las respuestas de las de-
mas peticiones y en caso contrario no se disparará nada.
    8. Ahora comenzaremos a trabajar con las demás peticiones, y primero tendremos que configurar una
variable del token en el Postman para ahorrar el trabajo, y luego agregar el middleware en todas las
peticiones.
    9. Tenemos que autentificar que el usuario que esté haciendo la petición sea un ADMIN_ROLE, para esto
crearemos otro middleware, el cual crearemos una variable igual al req.usuario y lo trabajamos con una
declaración y exportamos todos los middleware.
    10. Ahora tenemos que subir todos los cambios a github y heroku, probar el proyecto en producción, y
además configurar las variables en postman para que se guarden automáticamente los tokens. Para la
variable de entorno tenemos que ir al login y a la pestaña test, configuramos por medio de una declaración
y el objeto let resp = pm.response.json(); que contiene el token y el ok. La dicha sentencia se trabajará
con el ok para ver si es verdadero o falso.
*/

/* 
=============================================================================
VERIFICAR TOKEN
=============================================================================
*/
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    let token = req.get("Authorization");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                err
            });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    })
}

const autorizarToken = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role != "ADMIN_ROLE") {
        res.status(401).json({
            ok: false,
            message: "Tarea no permitida"
        });
    } else {
        next();
    }

}

module.exports = {
    verificarToken,
    autorizarToken
}