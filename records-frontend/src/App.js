import {DataProvider} from "./Components/DataContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Components/Main/Main";
import Persons from "./Components/Persons/Persons";
import Casefiles from "./Casefiles";
import PersonDetail from "./Components/PersonDetails/PersonDetail";
import CasefileDetail from "./CasefileDetail";
import LandingPage from "./Components/LandingPage/LandingPage";
import {UserProvider} from "./Components/UserContext";
import ManageCrimeTypes from "./Components/ManageCrimeTypes/ManageCrimeTypes";
import ManageUsers from "./Components/ManageUsers/ManageUsers";
import MySelect from "./MySelect";

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
                        <Route path="/xxx" element={<MySelect/>}/> {/*// TODO REMOVE*/}
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;

// TODO 4 *** implementar detalhe pessoa / Associar processos(usar dropdown em vez de checkboxes)  / associar foto / editar pessoa?
// ver pessoas no detalhe do processo
// criar pessoas no detalhe do processo
// apagar pessoas no detalhe do processo

// criar mais fields Person?
// Associar fotos pessoas
// focus noutras partes onde seja necessário

//no processo acrescentar data de ocorrência FACULTATIVO?

//tratar dados no backend ?

//IMPORTANTE *** TODO *** Fazer logout antes de submeter trabalho

//ordem alpha nas tabelas