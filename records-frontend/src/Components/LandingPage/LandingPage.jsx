import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./landingStyle.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import Popup from "../Popup";

function LandingPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/records/api/login/", {username, password}, {withCredentials: true});
            navigate('/main');
        } catch (error) {
            setMessageStyle("bg-danger text-white")
            setMessageTitle("O login falhou");
            setMessage(error.response.data.error);
            setUsername("");
            setPassword("");
            setShowPopup(true);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/records/api/signup/', {username, password});
            setMessageStyle("bg-success text-white")
            setMessageTitle("Já pode fazer login com o novo utilizador.");
            setMessage(response.data.message);
            setUsername("");
            setPassword("");
            setShowPopup(true);

        } catch (error) {
            setMessageTitle("O sign up falhou");
            setMessage(error.response.data.error);
            setUsername("");
            setPassword("");
            setShowPopup(true);
        }
    }

    return (
        <div className="landing-page">
            <h1>Sistema de Informação Criminal</h1>
            {showPopup && <Popup
                messageTitle={messageTitle}
                message={message}
                styles={messageStyle}
                onClose={handlePopupClose}
            />}
            <div className="login-signin">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Utilizador</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button variant="danger" onClick={handleSignUp}>
                            Sign up
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default LandingPage;
