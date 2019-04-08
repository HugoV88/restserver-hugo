const mongoose = require("mongoose"),
    uniqueValidator = require("mongoose-unique-validator"),
    Schema = mongoose.Schema;

const rolValidator = {
    values: ["USER_ROLE", "ADMIN_ROLE"],
    message: "El rol {VALUE} no es permitido"
}

const userSchema = new Schema({
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
        required: true,
        default: "USER_ROLE",
        enum: rolValidator
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

userSchema.methods.toJSON = function() {
    let user = this,
        userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: 'Error, el {PATH} debe ser único' });

module.exports = mongoose.model("Usuario", userSchema);