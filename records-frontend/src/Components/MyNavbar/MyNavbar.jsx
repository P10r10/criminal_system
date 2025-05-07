import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import badgeImg from "./badge.jpg";

function MyNavbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [isSuper, setIsSuper] = useState(false);
    const [isStaff, setIsStaff] = useState(null);
    const [userType, setUserType] = useState("Investigador");

    useEffect(() => {
        axios.get('http://localhost:8000/records/api/user/', {withCredentials: true})
            .then(response => {
                setUsername(response.data.username)
                setIsStaff(response.data.isStaff);
                setIsSuper(response.data.isSuper);
                if (isSuper) {
                    setUserType("Admin");
                } else if (isStaff) {
                    setUserType("Operador")
                }
            })
    }, [isStaff,isSuper]);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8000/records/api/logout/", {withCredentials: true});
            setUsername(null);
            navigate("/");
        } catch (error) {
            alert("Erro no logout");
        }
    }

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
                    />{' '}
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