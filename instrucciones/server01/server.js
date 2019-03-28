/* 
=======================================================================================================================
REST SERVER PARTE 1
======================================================================================================================
    1. Se importa la librería Express y se empieza a solicitar GET, POST, PUT y DELETE, ademas se configura la respuesta 
en formato json porque esta en html.
    2. En PUT comenzamos a trabajar con solicitud de ID, ingresandola en una variable. La variable esperará el 'request' 
del id de la solicitud para luego dar un response en formato json.
    3. Para obtener un payload (información que enviamos desde el cliente) en nuestro servidor, se utiliza un body-parser 
(información del cuerpo) que serializa la información en un paquete json para que sea fácilmente procesada en las peticiones PUT o POST. Se descarga un npm body-parser, para trabajar con middleware (bloque de código que se ejecuta entre la petición que hace el usuario 'request' hasta la petición que llega al servidor 'response').
    4. Se define el middleware bodyparser para que procesa la información en urlencoded y json.
    5. Dentro de la solicitud POST empezamos a trabajar con una variable que defina la información parseada, los status y 
un res.json. Se crean respuestas definidas por un condicional del error. 
    6. En el futuro se tendran diferentes entornos de trabajo, como de producción y desarrollo. Por ejemplo cuando montemos 
la base de datos es muy probable que tenga un puerto o cadena de conexión diferente. Para no estar copiando y modificando las variables una y otra vez, se crea un archivo donde se definan todas las variables y cambien según las necesidades.
    7. Para que no haya error en la nube, se debe escribir el "start" en el paquete JSON y pueda iniciar correctamente.
    8. Para poder trabajar simultáneamente entre producción y desarrollo, se debe crear un environment en "Postman", y 
para probarlo ser cambia el mensaje del desarollo
*/

/* Requires */
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

/* Constante para definir la función express */
const app = express();

/* (3)(4) Middleware para compatibilizar el payload con el servidor en formato json*/
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

/* Petición GET */
app.get('/usuario', (req, res) => {
    res.json('get Usario');
});

/* (4)(5) Petición POST */
app.post('/usuario', (req, res) => {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            persona: body
        })
    }
});

/* (2) Petición PUT */
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        id
    });
});

/* Petición DELETE */
app.delete('/usuario', (req, res) => {
    res.json('delete Usario');
});

/* (6) Método listen para montar un servidor HTTP y definir el puerto */
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);
});