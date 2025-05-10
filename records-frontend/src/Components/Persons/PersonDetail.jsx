import {useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useData} from "../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";
import {format} from "date-fns";
import "./personDetailStyle.css";
import {Card, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import shadowImg from "./shadow2.jpg";
import {useUserContext} from "../UserContext";

function PersonDetail() {

    const {state} = useLocation();
    const person = state.person;
    const {casefiles, PERSONCASEFILES_URL, personCasefiles, refreshPersonCasefiles} = useData();
    const {userType} = useUserContext();
    const [selectedCaseFiles, setSelectedCaseFiles] = useState([]);

    const personCasefileIds = personCasefiles // ids de casefiles já associados à pessoa
        .filter(person_file => person_file.person === person.id)
        .map(person_file => person_file.casefile)

    const matchingCaseFiles = casefiles.filter(casefile => // filtra casefiles por ids
        personCasefileIds.includes(casefile.id)
    );

    const availableCaseFiles = casefiles.filter( // casefiles ainda não associados à pessoa
        casefile => !personCasefileIds.includes(casefile.id)
    );

    const handleCaseFileSelection = (casefileId) => {
        setSelectedCaseFiles(prev => prev.includes(casefileId) ?
            prev.filter(id => id !== casefileId) : [...prev, casefileId]
        );
    };

    const associateCaseFiles = async () => {
        await Promise.all(selectedCaseFiles.map(casefileId =>
            axios.post(PERSONCASEFILES_URL, {person: person.id, casefile: casefileId,})
                .then(refreshPersonCasefiles)));
        setSelectedCaseFiles([]); // limpar checkboxes
    };

    const handleDeletion = async (casefileId) => {
        const personCaseFile = personCasefiles.find(pcf => pcf.person === person.id && casefileId === pcf.casefile);
        await axios.delete(PERSONCASEFILES_URL + personCaseFile.id + "/").then(refreshPersonCasefiles);
    }

    return (
        <div className="persons">
            <MyNavbar/>
            <div className="card-container">
                <Card style={{width: '22rem'}}>
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
                                <ListGroup.Item key={mcf.id}>{mcf.id}/{mcf.year} - {mcf.crime}
                                    {userType === "Admin" && (<Button
                                        onClick={() => handleDeletion(mcf.id)}>Remover</Button>)}
                                </ListGroup.Item>)) :
                            (<ListGroup.Item>Não tem processos associados</ListGroup.Item>)}
                    </ListGroup>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <Button variant="warning">
                                Associar processos
                            </Button>
                            <Button variant="info">
                                Associar foto
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/*{availableCaseFiles.length > 0 ? (*/}
            {/*    <div>*/}
            {/*        {availableCaseFiles.map(casefile => (*/}
            {/*            <div key={casefile.id}>*/}
            {/*                <input*/}
            {/*                    type="checkbox"*/}
            {/*                    checked={selectedCaseFiles.includes(casefile.id)}*/}
            {/*                    onChange={() => handleCaseFileSelection(casefile.id)}*/}
            {/*                />*/}
            {/*                <label>*/}
            {/*                    {casefile.id}/{casefile.year} - {casefile.crime}*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*        <button onClick={associateCaseFiles} disabled={selectedCaseFiles.length === 0}>*/}
            {/*            Associar processos à pessoa*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*) : (<p>Não há processos disponíveis para associar.</p>)*/}
            {/*}*/}




        </div>
    );
}

export default PersonDetail;
