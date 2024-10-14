import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validateToken = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/check-auth`, {
                withCredentials: true
            });
            if (res.data.success) {
                setIsAuthenticated(true);
                setUserData(res.data.user);
            }
        } catch (error) {
            setIsAuthenticated(false); // Handle error case
        }
    }

    useEffect(() => {
        validateToken();
    }, [setIsAuthenticated]);


    const login = (newData) => {
        setUserData(newData);
        setIsAuthenticated(true);
    }

    const logout = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/auth/logout`,
                {},
                { withCredentials: true }
            );

            console.log(res);
            setUserData(null);
            setIsAuthenticated(false);

        } catch (error) {
            console.log(error);
            message.error(error.response.data.message);
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userData, }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
