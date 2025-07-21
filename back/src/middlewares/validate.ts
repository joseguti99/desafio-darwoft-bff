import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import httpStatus from '../utils/httpStatus';

interface ValidationSchema {
    body?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    headers?: Joi.ObjectSchema;
}

interface ValidationData {
    body?: any;
    query?: any;
    params?: any;
    headers?: any;
}

export default function validate(schema: ValidationSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const validationData: ValidationData = {};

        if (schema.body) validationData.body = req.body;
        if (schema.query) validationData.query = req.query;
        if (schema.params) validationData.params = req.params;
        if (schema.headers) validationData.headers = req.headers;

        const { error } = Joi.object(schema).validate(validationData, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: false
        });

        if (error) {
            parserValidator(error, req, res, next);
        }

        next();
    };
};

export function parserValidator(
    joiError: Joi.ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { details } = joiError;
    const firstError = details[0];

    let message: string = firstError.message;

    if (firstError.context?.key === undefined) {
        message = message.replace('value', 'Array');
    }

    if (message.startsWith('"[')) {
        message = 'array' + message;
    }

    const error = {
        name: `Error: ${joiError.name}`,
        message: message,
    };

    res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        error,
    });
}