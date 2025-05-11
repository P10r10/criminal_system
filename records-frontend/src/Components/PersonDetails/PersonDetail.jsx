import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useData} from "../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";
import {format} from "date-fns";
import "./personDetailStyle.css";
import {Card, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import shadowImg from "../Persons/shadow.jpg";
import {useUserContext} from "../UserContext";
import ModalCreateAssociationType from "./ModalCreateAssociationType";

function PersonDetail() {

    const {state} = useLocation();
    const person = state.person; // aqui só é recebido um objecto person (não o array)
    const {casefiles, PERSONCASEFILES_URL, personCasefiles, refreshPersonCasefiles} = useData();
    const {userType} = useUserContext();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClickAssociateCrimeType = () => setShow(true);
    const handleClose = () => setShow(false);

    const personCasefileIds = personCasefiles // ids de casefiles já associados à pessoa
        .filter(person_file => person_file.person === person.id)
        .map(person_file => person_file.casefile)

    const matchingCaseFiles = casefiles.filter(casefile => // filtra casefiles por ids
        personCasefileIds.includes(casefile.id)
    );

    const availableCaseFiles = casefiles.filter( // casefiles ainda não associados à pessoa
        casefile => !personCasefileIds.includes(casefile.id)
    );

    const handleDeletion = async (casefileId) => {
        const personCaseFile = personCasefiles.find(pcf => pcf.person === person.id && casefileId === pcf.casefile);
        await axios.delete(PERSONCASEFILES_URL + personCaseFile.id + "/").then(refreshPersonCasefiles);
    }

    return (
        <div className="persons">
            <MyNavbar/>
            <ModalCreateAssociationType show={show}
                                        handleClose={handleClose}
                                        availableCaseFiles={availableCaseFiles}
                                        person={person}/>
            <div className="card-container">
                <Card style={{width: '25rem'}}>
                    <Card.Img variant="top" src={shadowImg}/>
                    <Card.Body>
                        <Card.Title>{person.name}</Card.Title>
                        <Card.Text>Alcunha {person.alias ? `(${person.alias})` : ""}</Card.Text>
                        <Card.Text>DN: {person.date_of_birth ? format(new Date(person.date_of_birth), "dd/MM/yyyy") : ""}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        {matchingCaseFiles.length > 0 ?
                            (matchingCaseFiles.map(mcf =>
                                <ListGroup.Item key={mcf.id}
                                                className="d-flex justify-content-between align-items-center">
                                    {mcf.id}/{mcf.year} - {mcf.crime}
                                    {userType === "Admin" && (<Button variant="danger"
                                                                      onClick={() => handleDeletion(mcf.id)}>Remover</Button>)}
                                </ListGroup.Item>)) :
                            (<ListGroup.Item>Não tem processos associados</ListGroup.Item>)}
                    </ListGroup>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <Button variant="warning" onClick={() => navigate("/persons")}>Voltar</Button>
                            {(userType === "Admin" || userType === "Operador") && (
                                <>
                                    <Button variant="success">Associar foto</Button>
                                    <Button variant="success"
                                            onClick={handleClickAssociateCrimeType}>Associar processo</Button>
                                </>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default PersonDetail;
