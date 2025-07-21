import { useState } from "react"
import { HttpStatusCode } from "axios"
import AuthService from "../../services/authService"
import { routesPaths } from "../../routes"
import { useNavigate } from "react-router-dom"
import { initialForm } from "./constants"
import Token from "../../cache/token"
import { useAuth } from "../../context/auth/authContext"

export default function useLogin() {
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState(initialForm)
    const [errorMessage, setErrorMessage] = useState(null)
    const { login } = useAuth()

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const authService = new AuthService()
            const data = await authService.login(loginForm.email, loginForm.password)
            if (data?.status === HttpStatusCode.Ok) {
                const useCacheToken = new Token()
                const { token, ...response } = data.data

                if (!token) return

                useCacheToken.set(token)
                login(token, response?.user)
                navigate(routesPaths.home)
                setLoginForm(initialForm)
            }
        }
        catch (httpError) {
            if (httpError?.response?.status === HttpStatusCode.Unauthorized) {
                setErrorMessage(httpError.response.data.message)
            }
            setErrorMessage('Error interno del servidor')
        }
    }

    return {
        loginForm,
        handleChange,
        handleSubmit,
        errorMessage
    }
}