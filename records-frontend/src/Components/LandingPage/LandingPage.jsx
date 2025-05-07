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
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        console.log("D: " + username);
        console.log("D: " + password);
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/records/api/login/", {username, password}, {withCredentials: true});
            navigate('/main');
        } catch (error) {
            setErrorMessage(error.response.data.error);
            setShowPopup(true);
        }
    };

    const handleSignUp = () => {
    }

    return (
        <div className="landing-page">
            <h1>Sistema de Informação Criminal</h1>
            {showPopup && <Popup message={errorMessage} styles="bg-danger text-white"/>}
            <div className="login-signin">
                <Form>
                    <Form.Group
                        className="mb-3"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                        <Form.Label>Utilizador</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"/>
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
