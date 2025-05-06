import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

function LandingPage() {
    return (
        <>
            <h1>Sistema de Informação Criminal</h1>
            <div className="login-signin">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Utilizador</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"/>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Button variant="danger" type="submit">
                            Sign up
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default LandingPage;
