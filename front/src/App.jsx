import { Routes, Route } from "react-router-dom"
import { routes } from './routes'
import { NotFoundRedirect, ValidatePermissionRoute } from "./middlewares"
import { Box, CircularProgress } from "@mui/material"
import { useAuth } from "./context/auth/authContext"

export default function App() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ValidatePermissionRoute
              component={route.component}
              requireAuth={route.requireAuth}
            />
          }
        />
      ))}
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  )
}