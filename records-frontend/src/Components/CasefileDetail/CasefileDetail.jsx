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
import Select from "react-select";
import Form from "react-bootstrap/Form";
import ModalAssociatePerson from "./ModalAssociatePerson";

function Casefile() {

    const {statusChoices, refreshCasefiles, CASEFILES_URL} = useData();
    const {userType} = useUserContext();
    const navigate = useNavigate();
    const {state} = useLocation();
    const casefile = state.casefile;
    const {personCasefiles, PERSONCASEFILES_URL, persons, refreshPersonCasefiles} = useData();
    const [statusSelected, setStatusSelected] = useState({value: "", label: ""}); // STRING
    const [show, setShow] = useState(false);
    const handleClickAssociatePerson = () => setShow(true);
    const handleClose = () => setShow(false);

    const personCasefileIds = personCasefiles // ids de pessoas já associadas ao processo
        .filter(person_file => person_file.casefile === casefile.id) // casefile.id = 4
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


    // const statusChoicesMapped = statusChoices.map((sc) =>
    //     ({value: sc.value, label: sc.label}));

    const handleChangeStatus = (option) => {
        setStatusSelected(option);
        // alert(statusSelected.label);
        axios.put(CASEFILES_URL + casefile.id + "/", {...casefile, status: statusSelected.label})
            .then(() => refreshCasefiles());
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
                        {/*<Card.Text>*/}
                        {/*    <Form.Label><strong>Estado:</strong></Form.Label>*/}
                        {/*    <Select name="status"*/}
                        {/*            value={statusSelected}*/}
                        {/*            onChange={(option) => handleChangeStatus(option)}*/}
                        {/*            isSearchable={false}*/}
                        {/*            isDisabled={!(userType === "Admin" || userType === "Operador")}*/}
                        {/*            options={statusChoicesMapped}*/}
                        {/*            placeholder={statusSelected}>*/}
                        {/*            /!*placeholder={casefile.status}>*!/*/}
                        {/*    </Select>*/}
                        {/*</Card.Text>*/}
                    </Card.Body>
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
                                <>
                                    {/*<Button variant="success"*/}
                                    {/*        onClick={handleChangeStatus}>Alterar estado</Button>*/}
                                    <Button variant="success"
                                            onClick={handleClickAssociatePerson}>Associar pessoa</Button>
                                </>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/*<select name="status" value={statusSelected} onChange={(e) => changeHandler(e)}>*/}
            {/*    {statusChoices.map(stat => (<option key={stat.id} value={stat.value}>{stat.label}</option>))}*/}
            {/*</select>*/}
            {/*<button>Alterar estado</button>*/}

        </div>
    );
}

export default Casefile;


// <h1>Processo: {casefile.id}/{casefile.year}</h1>
// <h2>Crime: {casefile.crime}</h2>
// <h3>Estado: {casefile.status}</h3>
// </div>
