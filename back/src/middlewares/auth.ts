import httpStatus from "../utils/httpStatus";
import { verify } from "../utils/jwt";

export default function authenticate(req: any, res: any, next: any) {
    const bearerToken = req.headers.authorization;

    // verificamos que hay token
    if (!bearerToken) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: httpStatus.UNAUTHORIZED,
            error: {
                name: 'Error: No token',
                message: 'No posee token en el header de autorización',
            },
        });
    }

    const token = bearerToken.startsWith('Bearer ')
        ? bearerToken.slice(7).trim()
        : bearerToken;

    try {
        // verificamos el token
        const decoded = verify(token);
        // si el token es válido, lo guardamos en la request
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: httpStatus.UNAUTHORIZED,
            error: {
                name: 'Error: Token no válido',
                message: 'El token no tiene permisos para realizar la operacion',
            },
        });
    }
}