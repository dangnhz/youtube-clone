
const Joi = require('@hapi/joi');

function registerValidation (req, res, next) {
    const schema = Joi.object({
        name: Joi.string()
        .required(),
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()

    })
    const {error} =  schema.validate(req.body)
    if (error) return   res.status(400).send({error: error.details[0].message})
    next()
}

function loginValidation (req, res, next) {
    const schema = Joi.object({
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()

    })
    const { error } =  schema.validate(req.body)
    if (error) return res.status(400).send({error: error.details[0].message})
    next()
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;