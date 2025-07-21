import axios, { HttpStatusCode } from 'axios'
import { routesPaths } from '../../routes';
import Token from '../../cache/token';
import { RedirectRateLimit } from '../../middlewares/RedirectRateLimit';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

RedirectRateLimit(axiosInstance) // Middleware para cuando la api caiga en rate limit

axiosInstance.interceptors.request.use(
    (config) => {
        const useCacheToken = new Token()

        const access_token = useCacheToken.get()

        config.headers.Authorization = `Bearer ${access_token}`;

        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config
    },
)

axiosInstance.interceptors.response.use(
    (response) => { return response },
    (error) => {
        if (error.response.status === HttpStatusCode.Unauthorized) {
            const useCacheToken = new Token()
            useCacheToken.remove()
            window.location.href = routesPaths.login
            return axiosInstance(error.config);
        }
        return error
    }
)

export default axiosInstance