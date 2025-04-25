import {useLocation} from "react-router-dom";

function Casefile() {

    const {state} = useLocation();
    const casefile = state.casefile;

    return (
        <div>
            <h1>Processo: {casefile.number}</h1>
            <h2>Crime: {casefile.crime}</h2>
            <h3>Estado: {casefile.status}</h3>
        </div>
    );
}

export default Casefile;