import {DataProvider} from "./Components/DataContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Components/Main/Main";
import Persons from "./Components/Persons/Persons";
import Casefiles from "./Casefiles";
import PersonDetail from "./PersonDetail";
import CasefileDetail from "./CasefileDetail";
import LandingPage from "./Components/LandingPage/LandingPage";
import {UserProvider} from "./Components/UserContext";
import ManageCrimeTypes from "./Components/ManageCrimeTypes/ManageCrimeTypes";

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
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;

// TODO 3 *** implementar gestão de crimes
// TODO 2 *** implementar gestão de users
// TODO 4 *** implementar detalhe pessoa
// ver pessoas no detalhe do processo
// criar pessoas no detalhe do processo
// apagar pessoas no detalhe do processo

// criar mais fields Person
// Associar fotos pessoas

//no processo acrescentar data de ocorrência FACULTATIVO?
//nas views falta PUT linha 56

//tratar dados no backend ?

//adicionar botões de navegação (menu, voltar, etc) usar React Bootstrap
//PersonDetail usar persons do DataContext? PINCEL...

//IMPORTANTE *** TODO *** Fazer logout antes de submeter trabalho
