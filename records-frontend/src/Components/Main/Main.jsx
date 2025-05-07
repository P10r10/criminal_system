import {useNavigate} from "react-router-dom";
import "./mainStyle.css";
import MyNavbar from "../MyNavbar/MyNavbar";

function Main() {

    const navigate = useNavigate();

    return(
        <div className="main">
            <MyNavbar />
            <h1>Sistema de Informação Criminal</h1>
            <h3 onClick={() => navigate("/persons")}>Gestão de pessoas</h3>
            <h3 onClick={() => navigate("/casefiles")}>Gestão de processos</h3>
            {/*OPCAO EDITAR TIPOS DE CRIME cfr utilizador*/}
        </div>
    );
}

export default Main;