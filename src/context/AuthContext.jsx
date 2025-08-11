import React, { createContext, useContext, useState } from "react";
import { login } from '@/api'
import { setToken, removeToken } from '@/lib/token'

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const authLogin = async (username, password) => {
        const token = await login(username, password)
        setToken(token)
    };
    const authLogout = () => {
        removeToken()
    };

    return (
        <AuthContext.Provider value={{ authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
