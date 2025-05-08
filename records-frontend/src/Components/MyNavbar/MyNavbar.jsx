import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import badgeImg from "./badge.jpg";
import {useUserContext} from "../UserContext";

function MyNavbar() {

    const {username, userType, handleLogout} = useUserContext();

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
                    Força policial de investigação criminal</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Utilizador: <strong>{username}</strong> ({userType}) <
                        Button
                        variant="danger"
                        onClick={handleLogout}>sair</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
