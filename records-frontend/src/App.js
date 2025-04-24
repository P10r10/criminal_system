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
// criar mais fields Person
// Associar fotos pessoas
// Estabelecer Relação muitos para muitos
// NO FIM - embelezar com primereact ou assim

//como conseguir Person.date_of_birth ser opcional???