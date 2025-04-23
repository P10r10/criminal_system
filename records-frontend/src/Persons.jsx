import {useEffect, useState} from "react";
import axios from "axios";

function Persons() {

    const [persons, setPersons] = useState([]);
    const PERSONS_URL = "http://127.0.0.1:8000/records/api/persons/";

    useEffect(() => {
        axios.get(PERSONS_URL).then(response => setPersons(response.data));
    }, []);

    return (
        <div>
            <h1>Persons</h1>
            <ul>
                {persons.map(person =>
                    <li>{person.name} - {person.alias} - {person.date_of_birth}</li>)}
            </ul>
        </div>
    );
}

export default Persons;