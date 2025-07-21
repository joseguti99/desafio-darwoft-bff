import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth/authContext"

export default function NotFoundRedirect() {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    } else {
        return <Navigate to="/login" replace />
    }
}
