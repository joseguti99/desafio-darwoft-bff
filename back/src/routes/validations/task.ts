import Joi from "joi";

export default {
    create: {
        body: Joi.object({
            text: Joi.string()
                .trim()
                .min(1)
                .required()
                .messages({
                    'string.empty': 'El campo "text" no puede estar vacío.',
                    'string.min': 'El campo "text" debe tener al menos un carácter.',
                    'any.required': 'El campo "text" es obligatorio.',
                }),
            title: Joi.string()
                .trim()
                .min(1)
                .required()
                .messages({
                    'string.empty': 'El campo "title" no puede estar vacío.',
                    'string.min': 'El campo "title" debe tener al menos un carácter.',
                    'any.required': 'El campo "title" es obligatorio.',
                }),
        }),
    },
    update: {
        body: Joi.object({
            text: Joi.string()
                .trim()
                .min(1)
                .messages({
                    'string.empty': 'El campo "text" no puede estar vacío.',
                    'string.min': 'El campo "text" debe tener al menos un carácter.',
                }),
            title: Joi.string()
                .trim()
                .min(1)
                .messages({
                    'string.empty': 'El campo "title" no puede estar vacío.',
                    'string.min': 'El campo "title" debe tener al menos un carácter.',
                }),
            completed: Joi.boolean(),
        }).or('text', 'completed', 'title').messages({
            'object.missing': 'Debe enviar al menos uno de los campos: "text" o "completed" o "title".',
        }),
    },
    deleteTask: {
        params: Joi.object({
            id: Joi.string()
                .trim()
                .min(1)
                .required()
                .messages({
                    'string.empty': 'El parámetro "id" no puede estar vacío.',
                    'string.min': 'El parámetro "id" debe tener al menos un carácter.',
                    'any.required': 'El parámetro "id" es obligatorio.',
                }),
        }),
    }
}