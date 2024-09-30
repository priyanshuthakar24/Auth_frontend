import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [token, settoken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const storeData = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (storeData) {
            const { userToken, user } = storeData;
            settoken(userToken);
            setUserData(user);
            setisAuthenticated(true);
        }
    }, [storeData]);
    const login = (newToken, newData) => {
        localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }));
        settoken(newToken);
        setUserData(newData);
        setisAuthenticated(true);
    }
    const logout = () => {
        localStorage.removeItem('user_data');
        settoken(null);
        setUserData(null)
        setisAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext); 