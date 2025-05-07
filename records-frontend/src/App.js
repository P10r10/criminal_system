import {DataProvider} from "./DataContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Components/Main/Main";
import Persons from "./Persons";
import Casefiles from "./Casefiles";
import PersonDetail from "./PersonDetail";
import CasefileDetail from "./CasefileDetail";
import Signup from "./Signup";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
      <DataProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LandingPage key="landing" />}/>
                  <Route path="/main" element={<Main key="main" />}/>
                  <Route path="/persons" element={<Persons/>}/>
                  <Route path="/persondetail" element={<PersonDetail/>}/>
                  <Route path="/casefiles" element={<Casefiles/>}/>
                  <Route path="/casefiledetail" element={<CasefileDetail/>}/>
                  <Route path="/signup" element={<Signup/>}/>
              </Routes>
          </BrowserRouter>
      </DataProvider>
  );
}

export default App;



// ver pessoas no detalhe do processo
// criar pessoas no detalhe do processo
// apagar pessoas no detalhe do processo

// criar mais fields Person
// Associar fotos pessoas
// NO FIM - embelezar com primereact ou assim

//no processo acrescentar data de ocorrência FACULTATIVO?
//nas views falta PUT linha 56

//many_to_many
//tratar dados no backend
//crimes podem ser editados pelo operador e admin

//adicionar botões de navegação (menu, voltar, etc) usar estilos Bootstrap, primereact,etc.
//PersonDetail usar persons do DataContext? PINCEL
