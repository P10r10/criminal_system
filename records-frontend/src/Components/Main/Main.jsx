import {useNavigate} from "react-router-dom";
import "./mainStyle.css";
import MyNavbar from "../MyNavbar/MyNavbar";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Main() {

    const navigate = useNavigate();

    return (
        <div className="main">
            <MyNavbar/>
            <h1>Sistema de Informação Criminal</h1>
            <div className="menu-options">
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand onClick={() => navigate("/persons")}>Gestão de pessoas</Navbar.Brand>
                    </Container>
                </Navbar>
                <br/>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand onClick={() => navigate("/casefiles")}>Gestão de processos</Navbar.Brand>
                    </Container>
                </Navbar>
                <br/>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>Gestão de tipos de crime</Navbar.Brand>
                    </Container>
                </Navbar>
                <br/>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>Gestão de utilizadores</Navbar.Brand>
                    </Container>
                </Navbar>
                {/*OPCAO EDITAR TIPOS DE CRIME cfr utilizador*/}
            </div>
        </div>
    );
}

export default Main;