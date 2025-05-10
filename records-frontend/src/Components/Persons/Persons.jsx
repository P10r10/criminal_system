import {useState} from "react";
import axios from "axios";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {useData} from "../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";
import {Table} from "react-bootstrap";
import "./personsStyle.css";
import {useUserContext} from "../UserContext";
import Button from "react-bootstrap/Button";
import ModalCreatePerson from "./ModalCreatePerson";

function Persons() {
    const {userType} = useUserContext();
    const {persons, refreshPersons, PERSONS_URL} = useData();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClickCreatePerson = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleRemovePerson = (idToRemove) => {
        axios.delete(PERSONS_URL + idToRemove + "/").then(() => refreshPersons());
    };

    return (
        <div className="persons">
            <MyNavbar/>
            <h1>
                Pessoas
                {(userType === "Admin" || userType === "Operador") && (
                    <Button variant="warning" onClick={handleClickCreatePerson}>
                        Criar pessoa
                    </Button>
                )}
            </h1>
            <ModalCreatePerson show={show} handleClose={handleClose}/>
            <div className="table-container">
                <Table striped>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Alcunha</th>
                        <th>Data de nascimento</th>
                        <th>Acções</th>
                    </tr>
                    </thead>
                    <tbody>
                    {persons.map((person) => (
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.alias}</td>
                            <td>{person.date_of_birth ? format(new Date(person.date_of_birth), "dd/MM/yyyy") : ""}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate("/persondetail", {state: {person}})}>Detalhe</Button>
                                {userType === "Admin" && (
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemovePerson(person.id)}>Remover</Button>
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

export default Persons;
