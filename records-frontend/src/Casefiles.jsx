import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import crimes from "./data/crimes.json";
import status from "./data/status.json";

function Casefiles() {
    const [casefiles, setCasefiles] = useState([]);
    const [inputs, setInputs] = useState({number: "", crime: "", status: ""})
    const CASEFILES_URL = "http://127.0.0.1:8000/records/api/casefiles/";
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(CASEFILES_URL).then(response => setCasefiles(response.data));
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(CASEFILES_URL, {
            number: inputs.number,
            crime: inputs.crime,
            status: inputs.status
        }).then(response => {
            setCasefiles([...casefiles, response.data]);
            setInputs({number: "", crime: "", status: ""});
        });
    }

    const changeHandler = (e) => {
        setInputs(i => ({...i, [e.target.name]: e.target.value}));
    }

    return (
        <div>
            <h1>Casefiles</h1>
            <ul>
                {casefiles.map((casefile, index) =>
                    <li key={index} onClick={() => navigate("/casefiledetail", {state: {casefile}})}>
                        {casefile.number} - {casefile.crime} - {casefile.status}
                    </li>)}
            </ul>
            <div>
                <form onSubmit={submitHandler}>
                    Número:<input type="text" name="number" value={inputs.number} onChange={changeHandler} required /><br/>
                    Crime:
                    <select name="crime" value={inputs.crime} onChange={changeHandler}>
                        {crimes.map((crime, index) => (<option key={index} value={crime.value}>{crime.label}</option>))}
                    </select><br/>
                    Estado:
                    <select name="status" value={inputs.status} onChange={changeHandler}>
                        {status.map((stat, index) => (<option key={index} value={stat.value}>{stat.label}</option>))}
                    </select>
                    <input type="submit" value="Submeter"/>
                </form>
            </div>
        </div>
    );
}

export default Casefiles;