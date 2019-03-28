/* 
    (1*server)
    1. Para que no se repita el guardado de datos repetidos, se crea un atributo en la propiedad email "unique: true".
    2. Se instalan las dependencias "mongoose-unique-validator" y se importan a este archivo, esto influenciará en la 
propiedad uniq.
    3. Se crea un plugin con las nuevas dependencias con "usuarioSchema.plugin(variable de la dependencia, error 
customizado)". Todo esto para dar errores personalizados
    4. Para que los roles de los usuarios sean definidos y no se puedan agregar roles no permitidos, se crea la propiedad
"enum", y esa propiedad será igual al objeto "rolesValidos" que crearemos para estructurar el límite de creación. Ese 
objeto contendrá una propiedad llamada "values" que será un arreglo con los roles permitidos, y otra propiedad llamada
"message" que se tendrá que poner con comillas simples con la llave del error en cuestion y el mensaje.
    5. Nos vamos al archivo de routes.
    (3*routes)
    6. No nos interesa que aparezca la contraseña, ni siquiera como parametro. Para poder desaparecer la contraseña
podemos igualarla a "null" en "routes" pero aún seguiría apareciendo el parámetro. La mejor forma de trabajar esto sería 
modificando método "toJSON" de forma clásica de función, ya que necesitamos esta forma para poder utilizar el this. El 
método "toJSON" siempre aparece cuando se intenta imprimir el objeto, y para convertirlo de "toJSON" a objeto se utiliza
"toObject" y se busca la propiedad password para después eliminarla con "delate", se retorna la función con el objeto
y el método "toObject".
FIN
*/

/* (2) Requires*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/* (4) Variable que se insertará en el enum donde definimos los roles permitidos */
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, "El email es necesario"],
        unique: true /* (1*server) Para que no se repita el mismo guardado*/
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
        default: 'USER_ROL',
        enum: rolesValidos /* (4) Para los roles permitidos */
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

/* (6) Forma para desaparece la contraseña */
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

/* (3) Para personalizar los errores se trabaja este plugin */
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model("Usuario", usuarioSchema);