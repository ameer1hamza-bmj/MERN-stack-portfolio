import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const API = import.meta.env.VITE_API;


    const authorization = token ? `Bearer ${token}` : null

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('token', serverToken)
        setToken(serverToken)
    }

    const isLoggedIn = !!token;



    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${API}/api/auth/users`, {
                headers: {
                    Authorization: authorization
                }
            })
            setIsLoading(false)
            console.log('LoggedIn User Data:', res.data.message);
            setUser(res.data.message)

        } catch (error) {
            console.log('Failed to Fetch User Data');
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (token) userAuthentication();
    }, [token])







    return <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, authorization, setToken, user, userAuthentication, isLoading, API }}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error('useTokenStorage must be used within an AuthProvider"')
    }
    return authContextValue
} 