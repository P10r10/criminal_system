import {useLocation} from "react-router-dom";

function Casefile() {

    const {state} = useLocation();
    const casefile = state.casefile;

    return (
        <div>
            <h1>Processo: {casefile.number}</h1>
            <h2>Crime: {casefile.crime}</h2>
            <h3>Estado: {casefile.status}</h3>
            {/*<select onChange={(e) => setSelectedPerson(e.target.value)}>*/}
            {/*    {persons.map((p) => (*/}
            {/*        <option key={p.id} value={p.id}>{p.name}</option>*/}
            {/*    ))}*/}
            {/*</select>*/}
            {/*<button onClick={linkPerson}>Add to Casefile</button>*/}

        </div>
    );
}

export default Casefile;