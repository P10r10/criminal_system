import {createContext, useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [messageStyle, setMessageStyle] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8000/records/api/login/',
                {username, password},
                {withCredentials: true}
            );
            navigate('/main');
        } catch (error) {
            setMessageStyle('bg-danger text-white');
            setMessageTitle('O login falhou');
            setMessage(error.response.data.error);
            setUsername('');
            setPassword('');
            setShowPopup(true);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/records/api/signup/', {
                username,
                password,
            });
            setMessageStyle('bg-success text-white');
            setMessageTitle('Sucesso. Pode fazer login.');
            setMessage(response.data.message);
            setUsername('');
            setPassword('');
            setShowPopup(true);
        } catch (error) {
            setMessageStyle('bg-danger text-white');
            setMessageTitle('O sign up falhou');
            setMessage(error.response.data.error);
            setUsername('');
            setPassword('');
            setShowPopup(true);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
                password,
                setPassword,
                showPopup,
                message,
                messageTitle,
                messageStyle,
                handleLogin,
                handleSignUp,
                handlePopupClose,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
