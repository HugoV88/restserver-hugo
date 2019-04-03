const mongoose = require("mongoose"),
    uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema,
    roleValidator = {
        values: ["USER_ROLE", "ADMIN_ROLE"],
        message: "El rol {VALUE} no es permitido"
    };

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El {PATH} es necesario"]
    },
    email: {
        type: String,
        required: [true, "El {PATH} es necesario"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El {PATH} es obligatorio"],
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        required: true,
        enum: roleValidator
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

usuarioSchema.plugin(uniqueValidator, { message: "Este {PATH} ya existe en la Base de Datos" });

usuarioSchema.methods.toJSON = function() {
    let user = this,
        userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

module.exports = mongoose.model("Usuario", usuarioSchema);