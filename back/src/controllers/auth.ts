import HTTP_STATUS_CODES from "../utils/httpStatus";
import { generateToken } from "../utils/jwt";
import AuthService from "../services/auth";
import HttpResponse from "../interfaces/httpResponse";
import { HttpRequest } from "../interfaces";
import httpStatus from "../utils/httpStatus";
import bcryptjs from 'bcryptjs';

const { OK, CREATED } = HTTP_STATUS_CODES;

export default class AuthController {
    public register = async (req: HttpRequest): Promise<HttpResponse> => {
        const { email, password } = req.body;

        const authService = new AuthService();

        // Verificamos si el usuario ya existe
        const allReadyExist = await authService.findOne(email);

        // Si el usuario ya existe, devolvemos un error
        if (allReadyExist?.email) {
            return {
                statusCode: httpStatus.BAD_REQUEST,
                data: {
                    success: false,
                    message: "El email ya esta registrado"
                }
            }
        }

        // Creamos el usuario
        const newUser = await authService.register({ email, password });

        // Generamos el token
        const token = generateToken(newUser.id.toString());

        return {
            statusCode: CREATED,
            data: {
                success: true,
                message: "Usuario registrado exitosamente",
                token
            }
        }

    };

    public login = async (req: HttpRequest): Promise<HttpResponse> => {
        const { email, password } = req.body;

        const authService = new AuthService();

        // Verificamos si el usuario existe
        const user = await authService.login({ email, password });

        const invalidResponse = {
            statusCode: httpStatus.UNAUTHORIZED,
            body: {
                success: false,
                message: "Credenciales invalidas"
            }
        }

        // Si el usuario no existe, devolvemos un error
        if (!user) {
            return {
                statusCode: httpStatus.UNAUTHORIZED,
                body: {
                    success: false,
                    message: "No existe una cuenta asociada a ese email"
                }
            }
        }

        // Verificamos si el password es correcto
        const token = generateToken(user.id.toString());

        const isMatch = await bcryptjs.compare(password, user.password);

        // Si el password no es correcto, devolvemos un error
        if (!isMatch) {
            return invalidResponse
        }

        const { password: userPassword, ...userData } = user;

        return {
            statusCode: OK,
            data: {
                success: true,
                message: "Login exitoso",
                user: userData,
                token
            }
        }
    };
}