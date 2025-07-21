import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth/authContext"

export default function ValidatePermissionRoute({ component: Component, requireAuth }) {
  const { isAuthenticated } = useAuth()

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return Component
}
