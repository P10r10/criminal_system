import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({children}) {
    const [persons, setPersons] = useState([]);
    const [casefiles, setCasefiles] = useState([]);
    const [links, setLinks] = useState([]); // personcasefiles
    const [crimetypes, setCrimetypes] = useState([]);
    const [statusChoices, setStatusChoices] = useState([]);

    const PERSONS_URL = "http://127.0.0.1:8000/records/api/persons/";
    const CASEFILES_URL = "http://127.0.0.1:8000/records/api/casefiles/";
    const LINKS_URL = "http://127.0.0.1:8000/records/api/personcasefiles/";
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

    const refreshLinks = async () => {
        const res = await axios.get(LINKS_URL);
        setLinks(res.data);
    };

    const refreshCrimeTypes = async () => {
        const res = await axios.get(CRIMETYPES_URL);
        setCrimetypes(res.data);
    };

    const refreshStatusChoices = async () => {
        const res = await axios.get(STATUS_CHOICES_URL);
        setStatusChoices(res.data);
    };

    useEffect(() => {
        (async () => {
            await Promise.all([
                refreshPersons(),
                refreshCasefiles(),
                refreshLinks(),
                refreshCrimeTypes(),
                refreshStatusChoices()
            ]);
        })();
    }, []);


    return (
        <DataContext.Provider value={{
            persons,
            casefiles,
            links,
            crimetypes,
            statusChoices,
            refreshPersons,
            refreshCasefiles,
            refreshLinks,
            refreshCrimeTypes,
            PERSONS_URL,
            CASEFILES_URL,
            CRIMETYPES_URL
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
