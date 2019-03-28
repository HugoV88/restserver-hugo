const mongoose = require("mongoose"),
    uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema,
    rolVal = {
        values: ["USER_ROLE", "ADMIN_ROLE"],
        message: "El rol {VALUE} no es permitido"
    };

let usuarioSchema = new Schema({
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
        required: [true, "El password es obligatorio"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        required: true,
        enum: rolVal
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
    let usuario = this,
        userObject = usuario.toObject();

    delete userObject.password;

    return userObject
}

usuarioSchema.plugin(uniqueValidator, { message: "Error, el {PATH} ya existe y no se puede repetir" });

module.exports = mongoose.model("Usuario", usuarioSchema);