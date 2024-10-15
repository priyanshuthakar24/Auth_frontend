import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOpen, setIsOpne] = useState(false);
    const [clicked, setClicked] = useState(null);
    const toggleDrawer = () => {
        setIsOpne(!isOpen);
        setClicked(null);
    };
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
            await axios.post(
                `${process.env.REACT_APP_API}/api/auth/logout`,
                {},
                { withCredentials: true }
            );

            setUserData(null);
            setIsAuthenticated(false);

        } catch (error) {
            console.log(error);
            message.error(error.response.data.message);
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userData, setIsAuthenticated, setUserData, clicked, setClicked, isOpen, setIsOpne, toggleDrawer }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
