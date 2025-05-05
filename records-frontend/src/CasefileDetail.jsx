import {useLocation} from "react-router-dom";
import SimpleLoginManager from "./SimpleLoginManager";
import {useEffect, useState} from "react";
import axios from "axios";

function Casefile() {

    const {state} = useLocation();
    const casefile = state.casefile;
    const [statusChoices, setStatusChoices] = useState([]);

    const STATUS_CHOICES_URL = "http://127.0.0.1:8000/records/api/status-choices/";

    useEffect(() => {
        axios.get(STATUS_CHOICES_URL).then(response => setStatusChoices(response.data));
    }, []);

    const changeHandler = () => {}

    return (
        <div>
            <SimpleLoginManager />
            <h1>Processo: {casefile.id}/{casefile.year}</h1>
            <h2>Crime: {casefile.crime}</h2>
            <h3>Estado: {casefile.status}</h3>
            {/*<select onChange={(e) => setSelectedPerson(e.target.value)}>*/}
            {/*    {persons.map((p) => (*/}
            {/*        <option key={p.id} value={p.id}>{p.name}</option>*/}
            {/*    ))}*/}
            {/*</select>*/}
            {/*<button onClick={linkPerson}>Add to Casefile</button>*/}
            Estado:
            <select name="status" value={casefile.status} onChange={changeHandler}>
                {statusChoices.map((stat, index) => (<option key={index} value={stat.value}>{stat.label}</option>))}
            </select>
            <button>Alterar estado</button>

        </div>
    );
}

export default Casefile;