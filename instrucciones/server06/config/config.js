/* 
    1. (8. ./server/server) Lo primero que debemos hacer es ir para mongodbAtlas y ver la configuración de
conexión, elejimos la opción de "Connect your application", copiamos el link que nos proporciona.
    2. Empazamos a configurar una variable de entorno local con "process.env.NODE_ENV" y la igualamos a sus
dos posibles opciones, la propia variable global o un entorno de desarrollo "dev".
    3. Comenzamos a configurar la base de datos, y primero se declara una variable undefined. Se procede a 
utilizar un condicionamiento que diga que si "process.env.NODE_ENV = 'dev'" retornará en el Url local y en
caso contrario retornará en el Url del servidor, todo esto igualado a la variable creada. Una vez hecho esto, 
se procede a importar las variables globales.
    4. Ahora se debe configurar el password en el url.
    5. Inventamos una variable de entorno global para igualarla a la variable que utilizamos en la declaración.
    6. Exportamos la variable de entorno global creada al servidor y se introduce en la conexión de mongodb.
    7. Forzamos para que haga una conexión con el servidor comentando lo que nos impide, y hacemos un test para
probar. 
FIN
*/

/* 
==============================================================================
PUERTO
==============================================================================
*/
process.env.PORT = process.env.PORT || 3000;

/* 
==============================================================================
ENTORNO
==============================================================================
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* 
==============================================================================
BASE DE DATOS
==============================================================================
*/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB = "mongodb+srv://HugoV88:ClcIEyWfiYuidAV1@cluster0-hmhix.mongodb.net/test?retryWrites=true";
}

process.env.URLDB = urlDB;