import {useNavigate} from "react-router-dom";

function Main() {

    const navigate = useNavigate();

    return(
        <div>
            <h1>Sistema de Informação Criminal</h1>
            <p onClick={() => navigate("/persons")}>Lista de pessoas</p>
            <p onClick={() => navigate("/casefiles")}>Lista de processos</p>
        </div>
    );
}

export default Main;