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
        localStorage.setItem('token', token);
        getInfoFromToken(token)
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserInfo('');
        localStorage.removeItem('token');
        navigate('/')
    };

    const getInfoFromToken = (token) => {
        const getConversations = async () => {
            const payload = jwtDecode(token);
            let loginUserInfo = {
                id: payload.customClaim.id,
                fullName: payload.customClaim.name,
                role: payload.customClaim.role[0].name,
                email: payload.sub,
            }
            console.log(loginUserInfo);
            setUserInfo(loginUserInfo);
            setIsLoggedIn(true);
        }
        getConversations()
        
    }
    let PROVIDER_VALUE = { 
        isLoggedIn, userInfo, loginSuccess, logout, setUserInfo
    }

    return (
        <AuthContext.Provider value={PROVIDER_VALUE}>
            {children}
        </AuthContext.Provider>
    );
};
