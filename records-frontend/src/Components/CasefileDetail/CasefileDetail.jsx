import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useData} from "../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";
import {Card, ListGroup} from "react-bootstrap";
import {format} from "date-fns";
import Button from "react-bootstrap/Button";
import {useUserContext} from "../UserContext";
import "./casefileDetailStyle.css";

function Casefile() {

    const {statusChoices, refreshCasefiles, CASEFILES_URL} = useData();
    const {userType} = useUserContext();
    const navigate = useNavigate();
    const {state} = useLocation();
    const casefile = state.cf;
    const [statusSelected, setStatusSelected] = useState(casefile.status);
    const [show, setShow] = useState(false);
    const handleClickAssociatePerson = () => setShow(true);
    const changeHandler = (e) => {
        setStatusSelected(e.target.value);
    }

    const handleChangeStatus = () => {
        if (statusSelected === "pendente") { // TODO HERE mudar para modal?
            setStatusSelected("arquivado");
        } else if (statusSelected === "arquivado") {
            setStatusSelected("acusado");
        } else if (statusSelected === "acusado") {
            setStatusSelected("pendente");
        }
        axios.put(CASEFILES_URL + casefile.id + "/", {...casefile, status: statusSelected})
            .then(() => refreshCasefiles());
    }

    return (
        <div className="casefiles">
            <MyNavbar/>
            {/*<ModalCreateAssociationType show={show}*/}
            {/*                            handleClose={handleClose}*/}
            {/*                            availableCaseFiles={availableCaseFiles}*/}
            {/*                            person={person}/>*/}
            <div className="card-container">
                <Card style={{width: '25rem'}}>
                    <Card.Body>
                        <Card.Title>{casefile.id + "/" + casefile.year}</Card.Title>
                        <Card.Text><strong>Crime:</strong> {casefile.crime} ({casefile.status})</Card.Text>
                        <Card.Text><strong>Data da
                            ocorrência:</strong> {format(new Date(casefile.crime_date), "dd/MM/yyyy")}</Card.Text>
                        <Card.Text><strong>Descrição:</strong> {casefile.description}</Card.Text>
                    </Card.Body>
                    {/*<ListGroup className="list-group-flush">*/}
                    {/*    {matchingCaseFiles.length > 0 ?*/}
                    {/*        (matchingCaseFiles.map(mcf =>*/}
                    {/*            <ListGroup.Item key={mcf.id}*/}
                    {/*                            className="d-flex justify-content-between align-items-center">*/}
                    {/*                {mcf.id}/{mcf.year} - {mcf.crime}*/}
                    {/*                {userType === "Admin" && (<Button variant="danger"*/}
                    {/*                                                  onClick={() => handleDeletion(mcf.id)}>Remover</Button>)}*/}
                    {/*            </ListGroup.Item>)) :*/}
                    {/*        (<ListGroup.Item>Não tem processos associados</ListGroup.Item>)}*/}
                    {/*</ListGroup>*/}
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <Button variant="warning" onClick={() => navigate("/casefiles")}>Voltar</Button>
                            {(userType === "Admin" || userType === "Operador") && (
                                <>
                                    <Button variant="success"
                                            onClick={handleChangeStatus}>Alterar estado</Button>
                                    <Button variant="success"
                                            onClick={handleClickAssociatePerson}>Associar pessoa</Button>
                                </>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Casefile;


//     <h1>Processo: {casefile.id}/{casefile.year}</h1>
//     <h2>Crime: {casefile.crime}</h2>
//     <h3>Estado: {casefile.status}</h3>
//     <select name="status" value={statusSelected} onChange={(e) => changeHandler(e)}>
//         {statusChoices.map((stat, idx) => (<option key={idx} value={stat.value}>{stat.label}</option>))}
//     </select>
//     <button onClick={handleChangeState}>Alterar estado</button>
// </div>
