import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Persons from "./Persons";
import Casefiles from "./Casefiles";
import PersonDetail from "./PersonDetail";
import CasefileDetail from "./CasefileDetail";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/persons" element={<Persons />}/>
          <Route path="/persondetail" element={<PersonDetail />}/>
          <Route path="/casefiles" element={<Casefiles />}/>
          <Route path="/casefiledetail" element={<CasefileDetail />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;


// TODO
// ver pessoas no detalhe do processo
// criar pessoas no detalhe do processo
// apagar pessoas no detalhe do processo


//CLEAN UP THE CODE WITH USECONTEXT

// criar mais fields Person
// Associar fotos pessoas
// NO FIM - embelezar com primereact ou assim

//como conseguir Person.date_of_birth ser opcional???

//no processo acrescentar data de ocorrência FACULTATIVO?