import { HttpStatusCode } from "axios"
import AuthService from "../../services/authService"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { initialForm } from "./constants"
import { routesPaths } from "../../routes"

export default function useRegister() {
    const navigate = useNavigate()
    const [registerForm, setRegisterForm] = useState(initialForm)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const authService = new AuthService()
            const data = await authService.register(registerForm.email, registerForm.password)
            if (data.status === HttpStatusCode.Created) {
                navigate(routesPaths.login)
            }
        } catch (httpError) {
            if (httpError.response.status === HttpStatusCode.BadRequest) {
                setErrorMessage(httpError.response.data.message)
            }
        }
    }

    return {
        registerForm,
        handleChange,
        handleSubmit,
        errorMessage
    }
}