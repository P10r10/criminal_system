import {useEffect, useState} from "react";
import axios from "axios";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";

function Persons() {

    const [persons, setPersons] = useState([]);
    const [inputs, setInputs] = useState({name: "", alias: "", date_of_birth: ""})
    const PERSONS_URL = "http://127.0.0.1:8000/records/api/persons/";
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(PERSONS_URL).then(response => setPersons(response.data));
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (inputs.name.trim() !== "" && inputs.date_of_birth.trim() !== "") {
            axios.post(PERSONS_URL, {
                name: inputs.name,
                alias: inputs.alias,
                date_of_birth: inputs.date_of_birth
            }).then(response => {
                setPersons([...persons, response.data]);
            });
        } else {
            alert("Name and dob are mandatory!")
        }
        setInputs({name: "", alias: "", date_of_birth: ""});
    }

    const changeHandler = (e) => {
        setInputs(i => ({...i, [e.target.name]: e.target.value}));
    }

    return (
        <div>
            <h1>Persons</h1>
            <ul>
                {persons.map((person, index) =>
                    <li key={index} onClick={() => navigate("/persondetail", {state: {person}})}>
                        {person.name} - {person.alias} - {format(new Date(person.date_of_birth), "dd/MM/yyyy")}
                    </li>)}
            </ul>
            <div>
                <form onSubmit={submitHandler}>
                    Nome:<input type="text" name="name" value={inputs.name} onChange={changeHandler}/><br/>
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