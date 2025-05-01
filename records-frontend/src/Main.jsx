import {useNavigate} from "react-router-dom";

function Main() {

    const navigate = useNavigate();

    return(
        <div>
            <h1>Sistema de Informação Criminal</h1>
            <h3 onClick={() => navigate("/persons")}>Gestão de pessoas</h3>
            <h3 onClick={() => navigate("/casefiles")}>Gestão de processos</h3>
            <button onClick={() => navigate("/signup")} >SIGNUP</button>
        </div>
    );
}

export default Main;