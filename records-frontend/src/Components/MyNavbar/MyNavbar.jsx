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
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <img
                        alt=""
                        src={badgeImg}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    Departamento de informação criminal
                    <Button variant="warning" onClick={() => navigate("/main")}>Menu</Button>
                </Navbar.Brand>
                <Navbar.Text className="d-flex align-items-center">
                    Utilizador: <strong className="ms-1">{username}</strong> ({userType})
                    <Button variant="danger" className="ms-2" onClick={handleLogout}>sair</Button>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
