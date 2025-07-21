import rateLimit from 'express-rate-limit';
import httpStatus from '../utils/httpStatus';

const { TO_MANY_REQUESTS } = httpStatus;

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20, // límite de 10 peticiones por IP
    statusCode: TO_MANY_REQUESTS, // Código de estado HTTP a devolver
    message: {
        status: TO_MANY_REQUESTS, // Código de estado HTTP a devolver
        message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.'
    }
});