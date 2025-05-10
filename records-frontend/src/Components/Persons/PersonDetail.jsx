import {useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useData} from "../DataContext";
import MyNavbar from "../MyNavbar/MyNavbar";

function PersonDetail() {

    const {state} = useLocation(); // TODO HERE buggy?
    const person = state.person;
    const {casefiles, PERSONCASEFILES_URL, personCasefiles, setPersonCasefiles} = useData();
    // const [personCasefiles, setPersonCasefiles] = useState([]);
    const [selectedCaseFiles, setSelectedCaseFiles] = useState([]);

    // useEffect(() => {
    //     axios.get(PERSONCASEFILES_URL).then(response => setPersonCasefiles(response.data));
    // }, [person]);

    const personCasefileIds = personCasefiles // ids de casefiles já associados à pessoa
        .filter(person_file => person_file.person === person.id)
        .map(person_file => person_file.casefile)

    const matchingCaseFiles = casefiles.filter(casefile => // filtra casefiles por ids
        personCasefileIds.includes(casefile.id)
    );

    const availableCaseFiles = casefiles.filter( // casefiles ainda não associados à pessoa
        casefile => !personCasefileIds.includes(casefile.id)
    );

    const handleCaseFileSelection = (casefileId) => {
        setSelectedCaseFiles(prev => prev.includes(casefileId) ?
            prev.filter(id => id !== casefileId) : [...prev, casefileId]
        );
    };

    const associateCaseFiles = async () => {
        await Promise.all(
            selectedCaseFiles.map(casefileId =>
                axios.post(PERSONCASEFILES_URL, {
                    person: person.id,
                    casefile: casefileId,
                })
            )
        );

        // const response = await axios.get(PERSONCASEFILES_URL); // refresh personCaseFiles
        // setPersonCasefiles(response.data);
        // setSelectedCaseFiles([]); // limpar checkboxes
    };

    const handleDeletion = async (casefileId) => {
        const personCaseFile = personCasefiles.find(
            pcf => pcf.person === person.id && casefileId === pcf.casefile
        );
        await axios.delete(PERSONCASEFILES_URL + personCaseFile.id + "/");
        setPersonCasefiles(prev => prev.filter(pcf => pcf.id !== personCaseFile.id));
    }

    return (
        <div>
            <MyNavbar/>
            <h1>Nome: {person.name}</h1>
            <h2>Alcunha: {person.alias}</h2>
            <h3>DN: {person.date_of_birth}</h3>
            <ul>Processos: {matchingCaseFiles.length > 0 ?
                (matchingCaseFiles.map(mcf =>
                    <li key={mcf.id}>{mcf.id}/{mcf.year} - {mcf.crime}
                        <button onClick={() => handleDeletion(mcf.id)}>Remover</button>
                    </li>)) :
                (<li>Esta pessoa não tem processos associados</li>)}
            </ul>
            <h4>Associar novos processos:</h4>
            {availableCaseFiles.length > 0 ? (
                <div>
                    {availableCaseFiles.map(casefile => (
                        <div key={casefile.id}>
                            <input
                                type="checkbox"
                                checked={selectedCaseFiles.includes(casefile.id)}
                                onChange={() => handleCaseFileSelection(casefile.id)}
                            />
                            <label>
                                {casefile.number} - {casefile.crime}
                            </label>
                        </div>
                    ))}
                    <button onClick={associateCaseFiles} disabled={selectedCaseFiles.length === 0}>
                        Associar processos à pessoa
                    </button>
                </div>
            ) : (
                <p>Não há processos disponíveis para associar.</p>
            )}
        </div>
    );
}

export default PersonDetail;
