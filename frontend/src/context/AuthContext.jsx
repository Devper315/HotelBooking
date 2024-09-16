// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getInfoFromToken(token)
        }
    }, []);

    const loginSuccess = (token) => {
        getInfoFromToken(token)
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserInfo('');
        localStorage.removeItem('token');
        navigate('/')
    };

    const getInfoFromToken = (token) => {
        const payload = jwtDecode(token);
        setIsLoggedIn(true);
        let loginUserInfo = {
            id: payload.customClaim.id,
            fullName: payload.customClaim.name,
            role: payload.customClaim.role[0].name,
        }
        setUserInfo(loginUserInfo);
        localStorage.setItem('token', token);
    }
    let PROVIDER_VALUE = { 
        isLoggedIn, userInfo, loginSuccess, logout 
    }

    return (
        <AuthContext.Provider value={PROVIDER_VALUE}>
            {children}
        </AuthContext.Provider>
    );
};
