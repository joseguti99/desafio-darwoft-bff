import useRegister from "./useRegister"
import { RegisterForm } from "../../components"

export default function Register() {
    const { registerForm, handleChange, handleSubmit, errorMessage } = useRegister()
    return (
        <RegisterForm
            form={registerForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
        />
    )
}