import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({children}) {
    const [persons, setPersons] = useState([]);
    const [casefiles, setCasefiles] = useState([]);
    const [personCasefiles, setPersoncasefiles] = useState([]);
    const [crimetypes, setCrimetypes] = useState([]);
    const [statusChoices, setStatusChoices] = useState([]);

    const PERSONS_URL = "http://127.0.0.1:8000/records/api/persons/";
    const CASEFILES_URL = "http://127.0.0.1:8000/records/api/casefiles/";
    const PERSONCASEFILES_URL = "http://127.0.0.1:8000/records/api/personcasefiles/";
    const CRIMETYPES_URL = "http://127.0.0.1:8000/records/api/crime-types/";
    const STATUS_CHOICES_URL = "http://127.0.0.1:8000/records/api/status-choices/";

    const refreshPersons = async () => {
        const res = await axios.get(PERSONS_URL);
        setPersons(res.data);
    };

    const refreshCasefiles = async () => {
        const res = await axios.get(CASEFILES_URL);
        setCasefiles(res.data);
    };

    const refreshCrimeTypes = async () => {
        const res = await axios.get(CRIMETYPES_URL);
        setCrimetypes(res.data);
    };

    const refreshStatusChoices = async () => {
        const res = await axios.get(STATUS_CHOICES_URL);
        setStatusChoices(res.data);
    };

    const refreshPersonCasefiles = async () => {
        const res = await axios.get(PERSONCASEFILES_URL);
        setPersoncasefiles(res.data);
    };

    useEffect(() => {
        (async () => {
            await Promise.all([
                refreshPersons(),
                refreshCasefiles(),
                refreshCrimeTypes(),
                refreshStatusChoices(),
                refreshPersonCasefiles()
            ]);
        })();
    }, []);


    return (
        <DataContext.Provider value={{
            persons,
            casefiles,
            personCasefiles,
            crimetypes,
            statusChoices,
            refreshPersons,
            refreshCasefiles,
            refreshPersonCasefiles,
            refreshCrimeTypes,
            PERSONS_URL,
            CASEFILES_URL,
            CRIMETYPES_URL,
            PERSONCASEFILES_URL
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
