/* 
=============================================================================
VERIFICAR TOKENS
=============================================================================
*/
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                err: {
                    message: "Token inválido"
                }
            });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    });
}

const verificarRol = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role == "ADMIN_ROLE") {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: "El usuario actual no tiene privilegios de administrador"
            }
        });
    }
}

module.exports = {
    verificarToken,
    verificarRol
}