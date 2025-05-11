import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import badgeImg from "./badge.jpg";
import {useUserContext} from "../UserContext";
import {useNavigate} from "react-router-dom";
import "./navStyle.css";

function MyNavbar() {

    const {username, userType, handleLogout} = useUserContext();
    const navigate = useNavigate();

    return (
        <div className="my-navbar">
            <Navbar className="my-navbar-bar">
                <Container>
                    <Navbar.Brand className="my-brand">
                        <img
                            alt=""
                            src={badgeImg}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{" "}
                        Departamento de informação criminal
                    </Navbar.Brand>
                    <Navbar.Text className="d-flex align-items-center">
                        Utilizador: <strong className="ms-1">{username}</strong> ({userType})
                        <Button variant="warning" onClick={() => navigate("/main")}>Menu</Button>
                        <Button variant="danger" className="ms-2" onClick={handleLogout}>sair</Button>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </div>
    );
}

export default MyNavbar;
