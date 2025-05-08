import {useState} from "react";
import axios from "axios";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {useData} from "../../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";
import {Table} from "react-bootstrap";
import "./personsStyle.css";
import {useUserContext} from "../UserContext";
import Button from "react-bootstrap/Button";

function Persons() {

    const {userType} = useUserContext();
    const {persons, refreshPersons, PERSONS_URL} = useData();
    const [inputs, setInputs] = useState({name: "", alias: "", date_of_birth: ""})
    const navigate = useNavigate();

    const handleCreatePerson = (e) => {
        e.preventDefault();
        axios.post(PERSONS_URL, {
            name: inputs.name,
            alias: inputs.alias || null,
            date_of_birth: inputs.date_of_birth || null
        }).then(() => {
            refreshPersons();
            setInputs({name: "", alias: "", date_of_birth: ""});
        });
    }

    const changeHandler = (e) => {
        setInputs(i => ({...i, [e.target.name]: e.target.value}));
    }

    const handleRemovePerson = (idToRemove) => {
        axios.delete(PERSONS_URL + idToRemove + "/").then(() => refreshPersons());
    }

    return (
        <div className="persons">
            <MyNavbar/>
            {/*TODO HERE CRIAR MODAL PARA CRIAR PESSOA*/}
            <h1>Pessoas
                {(userType === "Admin" || userType === "Operador") && (
                    <Button variant="warning" >Criar pessoa</Button>)}
            </h1>
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
                {persons.map(person => (
                    <tr>
                        <td>{person.name}</td>
                        <td>{person.alias}</td>
                        <td>{person.date_of_birth ? format(new Date(person.date_of_birth), "dd/MM/yyyy") : ""}</td>
                        <td><Button variant="primary" onClick={() => navigate("/persondetail", {state: {person}})}>Detalhe</Button>
                            {userType === "Admin" && (
                            <Button variant="danger" onClick={() => handleRemovePerson(person.id)}>Remover</Button>)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>


            <div className="create-person">
                <form onSubmit={handleCreatePerson}>
                    Nome:<input type="text" name="name" value={inputs.name} onChange={changeHandler} required/><br/>
                    Alcunha:<input type="text" name="alias" value={inputs.alias} onChange={changeHandler}/><br/>
                    DN:<input type="date" name="date_of_birth" value={inputs.date_of_birth}
                              onChange={changeHandler}/><br/>
                    <input type="submit" value="Criar pessoa"/>
                </form>
            </div>
        </div>
    );
}

export default Persons;