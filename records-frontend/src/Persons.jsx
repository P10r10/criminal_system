import {useEffect, useState} from "react";
import axios from "axios";
import {format} from "date-fns";

function Persons() {

    const [persons, setPersons] = useState([]);
    const PERSONS_URL = "http://127.0.0.1:8000/records/api/persons/";

    useEffect(() => {
        axios.get(PERSONS_URL).then(response => setPersons(response.data));
    }, []);

    const [name, setName] = useState("");
    const [alias, setAlias] = useState("");
    const [date_of_birth, setDate_of_birth] = useState("");

    const handleInputData = () => {
        if (name.trim() !== "" && date_of_birth.trim() !== "") {
            axios.post(PERSONS_URL, {name, alias, date_of_birth}).then(response => {
                setPersons([...persons, response.data]);
                setName("");
                setAlias("");
                setDate_of_birth("");
            });
        } else {
            alert("Name and dob are mandatory!")
        }
    }

    return (
        <div>
            <h1>Persons</h1>
            <ul>
                {persons.map((person, index) =>
                    <li key={index}>
                        {person.name} - {person.alias} - {format(new Date(person.date_of_birth), "dd/MM/yyyy")}</li>)}
            </ul>
            <div>
                <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" value={alias} placeholder="alias" onChange={(e) => setAlias(e.target.value)}/>
                <input type="date" value={date_of_birth} onChange={(e) => setDate_of_birth(e.target.value)}/>
                <button onClick={handleInputData}>Save</button>
            </div>
        </div>
    );
}

export default Persons;