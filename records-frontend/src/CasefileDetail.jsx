import {useLocation} from "react-router-dom";
import SimpleLoginManager from "./SimpleLoginManager";
import {useEffect, useState} from "react";
import axios from "axios";

function Casefile() {

    const {state} = useLocation();
    const casefile = state.casefile;
    const [statusChoices, setStatusChoices] = useState([]);
    const [statusSelected, setStatusSelected] = useState(casefile.status);

    const STATUS_CHOICES_URL = "http://127.0.0.1:8000/records/api/status-choices/";
    const CASEFILE_URL = `http://127.0.0.1:8000/records/api/casefiles/${casefile.id}/`;

    useEffect(() => {
        axios.get(STATUS_CHOICES_URL).then(response => setStatusChoices(response.data));
    }, []);

    const changeHandler = (e) => {
        setStatusSelected(e.target.value);
    }

    const handleClick = () => {
        axios.put(CASEFILE_URL, {...casefile, status: statusSelected}).then();
    }

    return (
        <div>
            <SimpleLoginManager/>
            <h1>Processo: {casefile.id}/{casefile.year}</h1>
            <h2>Crime: {casefile.crime}</h2>
            <h3>Estado: {casefile.status}</h3>
            <select name="status" value={statusSelected} onChange={(e) => changeHandler(e)}>
                {statusChoices.map((stat, index) => (<option key={index} value={stat.value}>{stat.label}</option>))}
            </select>
            <button onClick={handleClick}>Alterar estado</button>

        </div>
    );
}

export default Casefile;