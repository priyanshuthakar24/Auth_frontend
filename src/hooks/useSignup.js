import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();
    axios.defaults.withCredentials = true;
    const signupUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            console.log('step 1 done')
            const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/signup`, values);
            if (response.status === 201) {
                message.success(response.data.message);
                console.log(response);
                return nav('/auth/verify-email');

            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error(error.response.data.message)
        } finally { setLoading(false) }
    }
    return { loading, signupUser, error }

}

export default useSignup