/* 
    1. (3. server/server) Traemos la ruta del ./routes/user y ./routes/login.
    2. Para que funcionen estas rutas tendremos que definir las respectivas dependencias y
exportamos el app. Ademas debemos corregir las rutas.
    4. Importamos el archivo app al server/server.
    5. Ahora vamos al login para configurar el login del usuario.
*/

const express = require("express"),
    app = express();

app.use(require("./login"));
app.use(require("./user"));

module.exports = app;