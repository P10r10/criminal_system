import {DataProvider} from "./Components/DataContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Components/Main/Main";
import Persons from "./Components/Persons/Persons";
import Casefiles from "./Components/Casefiles/Casefiles";
import PersonDetail from "./Components/PersonDetails/PersonDetail";
import CasefileDetail from "./Components/CasefileDetail/CasefileDetail";
import LandingPage from "./Components/LandingPage/LandingPage";
import {UserProvider} from "./Components/UserContext";
import ManageCrimeTypes from "./Components/ManageCrimeTypes/ManageCrimeTypes";
import ManageUsers from "./Components/ManageUsers/ManageUsers";

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage key="landing"/>}/>
                        <Route path="/main" element={<Main key="main"/>}/>
                        <Route path="/persons" element={<Persons/>}/>
                        <Route path="/persondetail" element={<PersonDetail/>}/>
                        <Route path="/casefiles" element={<Casefiles/>}/>
                        <Route path="/casefiledetail" element={<CasefileDetail/>}/>
                        <Route path="/crimes" element={<ManageCrimeTypes/>}/>
                        <Route path="/users" element={<ManageUsers/>}/>
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;


// EDITAR PROCESSO *** todo alterar mudança de estado EDITAR PROCESSO

// *** Editar pessoa / associar foto ao criar ?/ usar mesmo modal para editar?
// *** editar processo? // ?

//tratar dados no backend ?

//ordem alpha nas tabelas IMPLEMENTAR pesquisa react select ou assim?
//IMPORTANTE *** TODO *** Fazer logout antes de submeter trabalho
