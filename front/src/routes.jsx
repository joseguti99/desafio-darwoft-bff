import { Home, Login, RateLimit, Register } from './pages/index.jsx'

export const routesPaths = {
    home: '/',
    login: '/login',
    register: '/register',
    rateLimit: '/rate-limit',
}

export const routes = [
    {
        path: routesPaths.home,
        component: <Home/>,
        requireAuth: true,
    },
    {
        path: routesPaths.login,
        component: <Login/>,
        requireAuth: false,
    },
    {
        path: routesPaths.register,
        component: <Register/>,
        requireAuth: false,
    },
    {
        path: routesPaths.rateLimit,
        component: <RateLimit/>,
        requireAuth: false,
    }
]