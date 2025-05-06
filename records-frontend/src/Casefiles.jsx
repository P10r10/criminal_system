import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import SimpleLoginManager from "./SimpleLoginManager";
import {useData} from "./DataContext";

function Casefiles() {
    const {casefiles, refreshCasefiles, CASEFILES_URL, crimetypes} = useData();
    const [inputs, setInputs] = useState({id: null, crime: "agressão", status: "pendente", year: null})
    const navigate = useNavigate();

    const handleCreateCasefile = (e) => {
        e.preventDefault();
        axios.post(CASEFILES_URL, {crime: inputs.crime}).then(() => refreshCasefiles());
    }

    const changeHandler = (e) => {
        setInputs(i => ({...i, [e.target.name]: e.target.value}));
    }

    const handleRemoveCasefile = (idToRemove) => {
        axios.delete(CASEFILES_URL + idToRemove + "/").then(() => refreshCasefiles());
    }

    return (
        <div>
            <SimpleLoginManager/>
            <h1>Processos</h1>
            <ul>
                {casefiles.map((casefile, index) =>
                    <li key={index}>
                        {casefile.id}/{casefile.year} - {casefile.crime} - {casefile.status}
                        <button onClick={() => handleRemoveCasefile(casefile.id)}>Remover</button>
                        <button onClick={() => navigate("/casefiledetail", {state: {casefile}})}>Ver detalhe</button>
                    </li>)}
            </ul>
            <div>
                <form onSubmit={handleCreateCasefile}>
                    Crime:
                    <select name="crime" value={inputs.crime} onChange={changeHandler}>
                        {crimetypes.map((crime, index) => (
                            <option key={index} value={crime.value}>{crime.label}</option>))}
                    </select>
                    <input type="submit" value="Criar processo"/>
                </form>
            </div>
        </div>
    );
}

export default Casefiles;