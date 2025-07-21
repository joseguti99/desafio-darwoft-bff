import Token from "../cache/token";
import axiosInstance from "./api";

export default class AuthService {
    async login(email, password) {
        const body = { email, password }

        if (!email || !password) {
            alert('Email o contraseña no pueden estar vacíos')
            return;
        }

        return await axiosInstance.post('/auth/login', body)
    }
    async register(email, password) {
        const body = { email, password }

        if (!email || !password) {
            alert('Email o contraseña no pueden estar vacíos')
            return;
        }

        return await axiosInstance.post('/auth/register', body)
    }
}