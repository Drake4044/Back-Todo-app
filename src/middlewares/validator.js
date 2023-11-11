const { validationResult } = require("express-validator")

const validatorCampos = ( req, res, next ) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors) // envia el mensaje de error
    }
    next()
}

module.exports = {
    validatorCampos
}