import {useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useData} from "./Components/DataContext";
import MyNavbar from "./Components/MyNavbar/MyNavbar";

function Casefile() {

    const {statusChoices, refreshCasefiles, CASEFILES_URL, casefiles} = useData();
    const {state} = useLocation();
    const casefileId = state.id;
    const casefile = casefiles.find((c) => c.id === casefileId);
    const [statusSelected, setStatusSelected] = useState(casefile.status);

    const changeHandler = (e) => {
        setStatusSelected(e.target.value);
    }

    const handleChangeState = () => {
        axios.put(CASEFILES_URL + casefile.id + "/", {...casefile, status: statusSelected})
            .then(() => refreshCasefiles());
    }

    return (
        <div>
            <MyNavbar/>
            <h1>Processo: {casefile.id}/{casefile.year}</h1>
            <h2>Crime: {casefile.crime}</h2>
            <h3>Estado: {casefile.status}</h3>
            <select name="status" value={statusSelected} onChange={(e) => changeHandler(e)}>
                {statusChoices.map((stat, idx) => (<option key={idx} value={stat.value}>{stat.label}</option>))}
            </select>
            <button onClick={handleChangeState}>Alterar estado</button>
        </div>
    );
}

export default Casefile;