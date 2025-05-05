import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import SimpleLoginManager from "./SimpleLoginManager";

function Casefiles() {
    const [casefiles, setCasefiles] = useState([]);
    const [crimetypes, setCrimetypes] = useState([]);
    const [inputs, setInputs] = useState({id: null, crime: "agressão", status: "pendente", year: null})
    const CASEFILES_URL = "http://127.0.0.1:8000/records/api/casefiles/";
    const CRIMETYPES_URL = "http://127.0.0.1:8000/records/api/crime-types/";
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(CASEFILES_URL).then(response => setCasefiles(response.data));
        axios.get(CRIMETYPES_URL).then(response => setCrimetypes(response.data));
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(CASEFILES_URL, {
            crime: inputs.crime,
            status: inputs.status
        }).then(response => {
            setCasefiles([...casefiles, response.data]);
        });
    }

    const changeHandler = (e) => {
        setInputs(i => ({...i, [e.target.name]: e.target.value}));
    }

    return (
        <div>
            <SimpleLoginManager />
            <h1>Processos</h1>
            <ul>
                {casefiles.map((casefile, index) =>
                    <li key={index} onClick={() => navigate("/casefiledetail", {state: {casefile}})}>
                        {casefile.id}/{casefile.year} - {casefile.crime} - {casefile.status}
                    </li>)}
            </ul>
            <div>
                <form onSubmit={submitHandler}>
                    Crime:
                    <select name="crime" value={inputs.crime} onChange={changeHandler} >
                        {crimetypes.map((crime, index) => (<option key={index} value={crime.value}>{crime.label}</option>))}
                    </select><br/>
                    <input type="submit" value="Criar processo"/>
                </form>
            </div>
        </div>
    );
}

export default Casefiles;