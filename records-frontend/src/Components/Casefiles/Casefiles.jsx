import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useData} from "../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";
import "./casefilesStyle.css";
import Button from "react-bootstrap/Button";
import {useUserContext} from "../UserContext";
import {Table} from "react-bootstrap";
import ModalCreateCasefile from "./ModalCreateCasefile";

function Casefiles() {
    const {userType} = useUserContext();
    const {casefiles, refreshCasefiles, CASEFILES_URL} = useData();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClickCreateCasefile = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleRemoveCasefile = (idToRemove) => {
        axios.delete(CASEFILES_URL + idToRemove + "/").then(() => refreshCasefiles());
    }

    return (
        <div className="casefiles">
            <MyNavbar/>
            <h1>Processos</h1>
            <ModalCreateCasefile show={show} handleClose={handleClose}/>
            <div className="button-group">
                <Button variant="warning"
                        onClick={() => navigate("/main")}>Voltar</Button>
                {(userType === "Admin" || userType === "Operador") && (
                    <Button variant="warning"
                            onClick={handleClickCreateCasefile}>Criar processo</Button>
                )}
            </div>


            <div className="table-container">
                <Table striped>
                    <thead>
                    <tr>
                        <th>Número</th>
                        <th>Crime</th>
                        <th>Estado</th>
                        <th>Acções</th>
                    </tr>
                    </thead>
                    <tbody>
                    {casefiles.map((casefile) => (
                        <tr key={casefile.id}>
                            <td>{casefile.id + "/" + casefile.year}</td>
                            <td>{casefile.crime}</td>
                            <td>{casefile.status}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate("/casefiledetail", {state: {casefile}})}
                                >Detalhe</Button>
                                {userType === "Admin" && (
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveCasefile(casefile.id)}>Remover</Button>
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

export default Casefiles;
