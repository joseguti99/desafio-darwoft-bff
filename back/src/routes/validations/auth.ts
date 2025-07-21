import Joi from "joi";

export default {
    register: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}