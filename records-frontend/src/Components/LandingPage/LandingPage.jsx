import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./landingStyle.css";
import Popup from "../Popup";
import {useUserContext} from "../UserContext";

function LandingPage() {

    const {
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
    } = useUserContext();

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
