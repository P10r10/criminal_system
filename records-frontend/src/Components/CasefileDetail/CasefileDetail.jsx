import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {useData} from "../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";
import {Card, ListGroup} from "react-bootstrap";
import {format} from "date-fns";
import Button from "react-bootstrap/Button";
import {useUserContext} from "../UserContext";
import "./casefileDetailStyle.css";
import ModalAssociatePerson from "./ModalAssociatePerson";

function Casefile() {

    const {userType} = useUserContext();
    const navigate = useNavigate();
    const {state} = useLocation();
    const casefile = state.casefile;
    const {personCasefiles, PERSONCASEFILES_URL, persons, refreshPersonCasefiles} = useData();
    const [show, setShow] = useState(false);
    const handleClickAssociatePerson = () => setShow(true);
    const handleClose = () => setShow(false);

    const personCasefileIds = personCasefiles // ids de pessoas já associadas ao processo
        .filter(person_file => person_file.casefile === casefile.id)
        .map(case_file => case_file.person);


    const matchingPersons = persons.filter(person => // filtra pessoas por ids
        personCasefileIds.includes(person.id)
    );

    const availablePersons = persons.filter( // pessoas ainda não associadas ao processo
        person => !personCasefileIds.includes(person.id)
    );

    const handleDeletion = async (personId) => {
        const personCaseFile = personCasefiles.find(pcf => pcf.person === personId && casefile.id === pcf.casefile);
        await axios.delete(PERSONCASEFILES_URL + personCaseFile.id + "/").then(refreshPersonCasefiles);
    }

    return (
        <div className="casefiles">
            <MyNavbar/>
            <ModalAssociatePerson show={show}
                                  handleClose={handleClose}
                                  availablePersons={availablePersons}
                                  casefile={casefile}/>
            <div className="card-container">
                <Card style={{width: '35rem'}}>
                    <Card.Body>
                        <Card.Title>{casefile.id + "/" + casefile.year}</Card.Title>
                        <Card.Text><strong>Crime:</strong> {casefile.crime} ({casefile.status})</Card.Text>
                        <Card.Text><strong>Data da
                            ocorrência: </strong>{format(new Date(casefile.crime_date), "dd/MM/yyyy")}</Card.Text>
                        <Card.Text><strong>Descrição:</strong> {casefile.description}</Card.Text>
                    </Card.Body>
                    <Card.Header style={{fontWeight: "bold"}}>Pessoas:</Card.Header>
                    <ListGroup className="list-group-flush">
                        {matchingPersons.length > 0 ?
                            (matchingPersons.map(mcp =>
                                <ListGroup.Item key={mcp.id}
                                                className="d-flex justify-content-between align-items-center">
                                    {mcp.name} - {mcp.date_of_birth ? format(new Date(mcp.date_of_birth), "dd/MM/yyyy") :
                                    "(DN desconhecida)"}
                                    {userType === "Admin" && (<Button variant="danger"
                                                                      onClick={() => handleDeletion(mcp.id)}>Remover</Button>)}
                                </ListGroup.Item>)) :
                            (<ListGroup.Item>Não tem pessoas associadas</ListGroup.Item>)}
                    </ListGroup>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <Button variant="warning" onClick={() => navigate("/casefiles")}>Voltar</Button>
                            {(userType === "Admin" || userType === "Operador") && (
                                <Button variant="success"
                                        onClick={handleClickAssociatePerson}>Associar pessoa</Button>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Casefile;
