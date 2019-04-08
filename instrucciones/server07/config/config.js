/* 
    1. (10. ./routes/login) Creamos las variables de entorno del vencimiento del token y
la semilla de autentificación, que es nuestra firma.
    2. Cambiamos todas los valores de nuestro jwt por las variables de entorno.
    3. Ahora necesitaremos un middleware para poder poder verificar el token en nuestras
solicitudes get, para eso nos debemos ir para "./routes/user"
*/

/* 
=========================================================================
PORT
=========================================================================
*/
process.env.PORT = process.env.PORT || 3000;

/* 
=========================================================================
ENTORNO
=========================================================================
*/
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/* 
======================================================================================
VENCIMIENTO DEL TOKEN
======================================================================================
*/
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/* 
======================================================================================
SEMILLA DE LA FIRMA DE AUTENTIFICACION
======================================================================================
*/
process.env.SEED = "secret-token";

/* 
=========================================================================
BASE DE DATOS
=========================================================================
*/
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = 'mongodb://localhost:27017/prueba';
} else {
    urlDB = 'mongodb+srv://HugoV88:ClcIEyWfiYuidAV1@cluster0-hmhix.mongodb.net/prueba?retryWrites=true';
}

process.env.URLDATA = urlDB;