import {useNavigate} from "react-router-dom";
import "./mainStyle.css";
import MyNavbar from "../MyNavbar/MyNavbar";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {useUserContext} from "../UserContext";

function Main() {

    const {userType} = useUserContext();
    const navigate = useNavigate();

    return (
        <div className="main">
            <MyNavbar/>
            <h1>Sistema de Informação Criminal</h1>
            <div className="menu-options">
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand onClick={() => navigate("/persons")}>Aceder a pessoas</Navbar.Brand>
                    </Container>
                </Navbar>
                <br/>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand onClick={() => navigate("/casefiles")}>Aceder a processos</Navbar.Brand>
                    </Container>
                </Navbar>
                <br/>
                {(userType === "Admin" || userType === "Operador") && (
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand onClick={() => navigate("/crimes")}>Gerir de tipos de crime</Navbar.Brand>
                        </Container>
                    </Navbar>
                )}
                <br/>
                {userType === "Admin" && (
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand onClick={() => navigate("/users")}>Gerir utilizadores</Navbar.Brand>
                        </Container>
                    </Navbar>
                )}
            </div>
        </div>
    );
}

export default Main;