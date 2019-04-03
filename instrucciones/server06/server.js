/* 
    1. (5. ./routes/user.js) La base de datos mongodb esta desplegada localmente en nuestra máquina como se
muestra en el connect. Para poderla desplegar a la web debemos trabajar con mongodb Atlas.
    2. Entramos al mongodb Atlas y construimos un cluster. Aquí llenamos todos los datos y seleccionamos el
servicio gratuito, una vez terminado nuestro cluster empezará a cargar.
    3. Mientras que carga nuestro cluster comenzaremos a configurar. Nos vamos a security y a la pestaña 
"White List" y agregamos una ip que nos permita acceder desde todos lados.
    4. Vamos a mongoDBUsers y creamos un usuario que sea administrador para que tenga todos los servicios.
    5. Una vez cargado el cluster, lo probaremos creando una colleción, creamos la base de datos y todo debería
funcionar.
    6. Ahora conectamos el mongodbAtlas con mongodbCompass y en este último le damos "new conection". Del Atlas le 
damos connect y nos dará una url que copiamos y será detectada por el Compass. Lo que restaría es colocar el pass
que nos dio Atlas y colocarlo en Compass, ya nuestra base de datos debe estar conectada.
    7. Ahora desde nuestra consola debemos cersiorarnos de que el npm está actualizado.
    8. Ahora nos vamos a ./config/config
*/

require("./config/config");
const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./routes/user"));

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log("Base de Datos ONLINE");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})