const mongoose = require("mongoose"),
    uniqueValidator = require("mongoose-unique-validator"),
    Schema = mongoose.Schema;

const rolValidator = {
    values: ["USER_ROLE", "ADMIN_ROLE"],
    message: "El {VALUE} no es un rol permitido"
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        required: [true, "El email es necesario"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es necesario"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        required: true,
        enum: rolValidator
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

usuarioSchema.methods.toJSON = function() {
    let user = this,
        userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: "El {PATH} ya existe en la Base de Datos" });

module.exports = mongoose.model("Usuario", usuarioSchema);