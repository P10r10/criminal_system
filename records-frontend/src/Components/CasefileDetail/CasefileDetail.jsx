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

function Casefile() {

    const {statusChoices, refreshCasefiles, CASEFILES_URL} = useData();
    const {userType} = useUserContext();
    const navigate = useNavigate();
    const {state} = useLocation();
    const casefile = state.cf;
    const [statusSelected, setStatusSelected] = useState(casefile.status);
    const [show, setShow] = useState(false);
    const handleClickAssociatePerson = () => setShow(true);

    const statusChoicesMapped = statusChoices.map((sc) =>
        ({value: sc.value, label: sc.label}));

    const changeHandler = (e) => {
        setStatusSelected(e.target.value);
    }

    const handleChangeStatus = () => {
        alert(statusChoices[0].label);
        // axios.put(CASEFILES_URL + casefile.id + "/", {...casefile, status: statusSelected})
        //     .then(() => refreshCasefiles());
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
                        <Card.Text>
                            <Select name="status"
                                    value={statusSelected}
                                    onChange={(e) => changeHandler(e)}
                                    isSearchable={false}
                                    isDisabled={!(userType === "Admin" || userType === "Operador")}
                                    options={statusChoicesMapped}
                                    placeholder={casefile.status} //mudar? alterar escolha estado para Capital na criação do processo
                            >
                                {statusChoices.map(stat => (<option key={stat.id}
                                                                    value={stat.label}
                                >{stat.label}</option>))}
                            </Select>
                        </Card.Text>
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
                                    <Button variant="succe  ss"
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
