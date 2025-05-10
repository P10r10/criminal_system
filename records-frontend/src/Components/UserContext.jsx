import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const [isSuper, setIsSuper] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [userType, setUserType] = useState("");
    const USER_URL = "http://localhost:8000/records/api/user/";
    const USERS_URL = "http://localhost:8000/records/api/users/";
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedUserType = localStorage.getItem("userType");

        if (storedUsername && storedUserType) {
            setUsername(storedUsername);
            setUserType(storedUserType);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await Promise.all([
                refreshUsers()
            ]);
        })();
    }, []);

    useEffect(() => {  // faz o refreshUsers quando se acede ao ManageUsers
        if (location.pathname === "/users") {
            refreshUsers().then();
        }
    }, [location.pathname]);

    const refreshUsers = async () => {
        const res = await axios.get(USERS_URL);
        setUsers(res.data);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:8000/records/api/login/",
                {username, password},
                {withCredentials: true}
            );

            const response = await axios.get(USER_URL, {withCredentials: true,});
            const fetchedUsername = response.data.username;
            const fetchedUserType = response.data.isSuper ? "Admin" : response.data.isStaff ? "Operador" : "Investigador";
            setUsername(fetchedUsername);
            setIsStaff(response.data.isStaff);
            setIsSuper(response.data.isSuper);
            setUserType(fetchedUserType);
            localStorage.setItem('username', fetchedUsername);
            localStorage.setItem('userType', fetchedUserType);
            navigate("/main");
        } catch (error) {
            setMessageStyle("bg-danger text-white");
            setMessageTitle("O login falhou");
            setMessage(error.response.data.error);
            setUsername("");
            setPassword("");
            setShowPopup(true);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/records/api/signup/", {username, password,});
            setMessageStyle("bg-success text-white");
            setMessageTitle("Já pode fazer login.");
            setMessage(response.data.message);
            setUsername("");
            setPassword("");
            setShowPopup(true);
            navigate("/");
        } catch (error) {
            setMessageStyle("bg-danger text-white");
            setMessageTitle("O sign up falhou");
            setMessage(error.response.data.error);
            setUsername("");
            setPassword("");
            setShowPopup(true);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8000/records/api/logout/", {withCredentials: true});
            setUsername("");
            setPassword("");
            setIsStaff(false);
            setIsSuper(false);
            setUserType("");
            localStorage.removeItem('username');
            localStorage.removeItem('userType');
            navigate("/");
        } catch (error) {
            setMessageStyle("bg-danger text-white");
            setMessageTitle("Erro no logout");
            setMessage("Não foi possível fazer logout. Tente novamente.");
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
                isSuper,
                isStaff,
                userType,
                handleLogin,
                handleSignUp,
                handleLogout,
                handlePopupClose,
                USERS_URL,
                refreshUsers,
                users
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
