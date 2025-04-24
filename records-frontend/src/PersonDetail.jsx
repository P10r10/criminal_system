import {useLocation} from "react-router-dom";

function PersonDetail() {

    const {state} = useLocation();
    const person = state.person;

    return (
        <div>
            <h1>{person.name}</h1>
            <h2>{person.alias}</h2>
            <h3>{person.date_of_birth}</h3>
        </div>
    );
}

export default PersonDetail;