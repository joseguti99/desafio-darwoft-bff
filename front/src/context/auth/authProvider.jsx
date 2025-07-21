import { useEffect, useState } from "react"
import { AuthContext } from "./authContext"
import { Token, User } from "../../cache"
import { routesPaths } from "../../routes"


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const cacheToken = new Token()
        const cacheUser = new User()

        setToken(cacheToken.get())
        setUser(cacheUser.get())
        setIsLoading(false)
    }, [])

    const login = (newToken, newUser) => {
        new Token().set(newToken)
        setToken(newToken)
        new User().set(newUser)
        setUser(newUser)
    }

    const logout = () => {
        new Token().remove()
        setToken(null)
        new User().remove()
        setUser(null)
        window.location.href = routesPaths.login
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: Boolean(token), isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
