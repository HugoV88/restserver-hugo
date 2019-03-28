/* 
=============================================================================
(5)(6*server) MODELS
=============================================================================
    1. Se importa las dependencias de mongoose.
    2. Se crea el constructor Schema que se encargará de construir el esquema del modelo.
    3. Se crea el modelo del usuario con la siguiente configuración: nombre, email, etc
    4. Se exporta el modelo con 'module.exports = mongoose.model("nombre", configuración)' y se recibe en el routes con un
simple require.
    5. Nos vamos al archivo "/routes/usuario"
*/

const mongoose = require("mongoose");

/* (2) Variable para guardar la propiedad de Schema */
let Schema = mongoose.Schema;

/* (3) Modelo creado con la variable Schema y declarandola como nueva*/
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        required: [true, "El correo es necesario"]
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROL"
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/* (4) La exportación del modelo con el método mongoose.mode("Nombre", variable que da configuración) */
module.exports = mongoose.model("Usuario", usuarioSchema);