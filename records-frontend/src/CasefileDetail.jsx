import {useLocation} from "react-router-dom";
import stat from "./data/status.json";
import SimpleLoginManager from "./SimpleLoginManager";

function Casefile() {

    const {state} = useLocation();
    const casefile = state.casefile;

    const changeHandler = () => {}

    return (
        <div>
            <SimpleLoginManager />
            <h1>Processo: {casefile.id}/{casefile.year}</h1>
            <h2>Crime: {casefile.crime}</h2>
            <h3>Estado: {casefile.status}</h3>
            {/*<select onChange={(e) => setSelectedPerson(e.target.value)}>*/}
            {/*    {persons.map((p) => (*/}
            {/*        <option key={p.id} value={p.id}>{p.name}</option>*/}
            {/*    ))}*/}
            {/*</select>*/}
            {/*<button onClick={linkPerson}>Add to Casefile</button>*/}
            Estado:
            <select name="status" value={casefile.status} onChange={changeHandler}>
                {stat.map((stat, index) => (<option key={index} value={stat.value}>{stat.label}</option>))}
            </select>
            <button>Alterar estado</button>

        </div>
    );
}

export default Casefile;