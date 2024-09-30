import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();
    const loginUser = async (values) => {

        try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:4001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (res.status === 200) {
                message.success(data.message);
                login(data.token, data.user);
                return nav('/');
            } else if (res.status === 404) {
                setError(data.message)
            } else {
                message.error('Registration Failed');
            }
        } catch (error) {
            message.error('Registration Failed');
        } finally { setLoading(false) }
    };
    return { loading, error, loginUser };
}

export default useLogin;