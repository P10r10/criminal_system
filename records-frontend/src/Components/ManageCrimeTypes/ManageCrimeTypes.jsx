import MyNavbar from "../MyNavbar/MyNavbar";
import "./crimeStyle.css";
import {useData} from "../DataContext";
import Button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";
import {useUserContext} from "../UserContext";
import axios from "axios";
import {useState} from "react";
import ModalCreateCrimeType from "./ModalCreateCrimeType";
import {useNavigate} from "react-router-dom";

function ManageCrimeTypes() {

    const {crimetypes, CRIMETYPES_URL, refreshCrimeTypes} = useData();
    const {userType} = useUserContext();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleRemoveCrimeType = (idToRemove) => {
        axios.delete(CRIMETYPES_URL + idToRemove + "/").then(() => refreshCrimeTypes());
    };

    const handleClickCreateCrimeType = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className="crime-style">
            <MyNavbar/>
            <h1>Gerir tipos de crime</h1>
            <ModalCreateCrimeType show={show} handleClose={handleClose}/>
            <div className="button-group">
                <Button variant="warning"
                        onClick={() => navigate("/main")}>Voltar</Button>
                {(userType === "Admin" || userType === "Operador") && (
                    <Button variant="warning"
                            onClick={handleClickCreateCrimeType}>Criar tipo de crime</Button>
                )}
            </div>
            <div className="table-container">
                <Table striped>
                    <thead>
                    <tr>
                        <th>Crime</th>
                        <th>Acções</th>
                    </tr>
                    </thead>
                    <tbody>
                    {crimetypes.map((ct) => (
                        <tr key={ct.id}>
                            <td>{ct.value}</td>
                            <td>
                                {(userType === "Admin" || userType === "Operador") && (
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveCrimeType(ct.id)}>Remover</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ManageCrimeTypes;
