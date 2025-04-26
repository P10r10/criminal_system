import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function PersonDetail() {

    const {state} = useLocation();
    const person = state.person;
    const PERSONCASEFILES_URL = "http://127.0.0.1:8000/records/api/personcasefiles/";
    const [personCaseFiles, setPersonCaseFiles] = useState([]);
    const [casefiles, setCasefiles] = useState([]);
    const CASEFILES_URL = "http://127.0.0.1:8000/records/api/casefiles/";

    useEffect(() => {
        axios.get(PERSONCASEFILES_URL).then(response => setPersonCaseFiles(response.data));
        axios.get(CASEFILES_URL).then(response => setCasefiles(response.data));
    }, []);

    const personCasefilesIds = personCaseFiles
        .filter(person_file => person_file.person === person.id)
        .map(person_file => person_file.casefile)

    const matchingCaseFiles = casefiles.filter(casefile =>
        personCasefilesIds.includes(casefile.id)
    );

    return (
        <div>
            <h1>Nome: {person.name}</h1>
            <h2>Alcunha: {person.alias}</h2>
            <h3>DN: {person.date_of_birth}</h3>
            <ul>Processos: {matchingCaseFiles.map(cf => <li>{cf.number} - {cf.crime}</li>)}
            </ul>
        </div>
    );
}

export default PersonDetail;