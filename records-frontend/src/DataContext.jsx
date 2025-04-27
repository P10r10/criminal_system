import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({children}) {
    const [persons, setPersons] = useState([]);
    const [casefiles, setCasefiles] = useState([]);
    const [links, setLinks] = useState([]); // personcasefiles

    const PERSONS_URL = "http://127.0.0.1:8000/records/api/persons/";
    const CASEFILES_URL = "http://127.0.0.1:8000/records/api/casefiles/";
    const LINKS_URL = "http://127.0.0.1:8000/records/api/personcasefiles/";

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

    useEffect(() => {
        (async () => {
            await Promise.all([
                refreshPersons(),
                refreshCasefiles(),
                refreshLinks()
            ]);
        })();
    }, []);


    return (
        <DataContext.Provider value={{
            persons,
            casefiles,
            links,
            refreshPersons,
            refreshCasefiles,
            refreshLinks,
            PERSONS_URL
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
