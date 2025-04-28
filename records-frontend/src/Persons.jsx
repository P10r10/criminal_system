import {useState} from "react";
import axios from "axios";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {useData} from "./DataContext";

function Persons() {

    const {persons, refreshPersons, PERSONS_URL} = useData();
    const [inputs, setInputs] = useState({name: "", alias: "", date_of_birth: ""})
    const navigate = useNavigate();

    const submitHandler = (e) => {
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

    return (
        <div>
            <h1>Pessoas</h1>
            <ul>
                {persons.map(person =>
                    <li key={person.id} onClick={() => navigate("/persondetail", {state: {person}})}>
                        {person.name} - {person.alias} - {person.date_of_birth ?
                        format(new Date(person.date_of_birth), "dd/MM/yyyy") : ""}
                    </li>)}
            </ul>
            <div>
                <form onSubmit={submitHandler}>
                    Nome:<input type="text" name="name" value={inputs.name} onChange={changeHandler} required/><br/>
                    Alcunha:<input type="text" name="alias" value={inputs.alias} onChange={changeHandler}/><br/>
                    DN:<input type="date" name="date_of_birth" value={inputs.date_of_birth}
                              onChange={changeHandler}/><br/>
                    <input type="submit" value="Submeter"/>
                </form>
            </div>
        </div>
    );
}

export default Persons;