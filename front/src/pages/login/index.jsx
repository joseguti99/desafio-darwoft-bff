import useLogin from "./useLogin"
import { LoginForm } from "../../components"

export default function Login() {
    const { loginForm, handleChange, handleSubmit, errorMessage } = useLogin()
    return (
        <LoginForm
            form={loginForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage} />
    )
}