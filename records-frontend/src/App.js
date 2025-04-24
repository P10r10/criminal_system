import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Persons from "./Persons";
import Casefiles from "./Casefiles";
import PersonDetail from "./PersonDetail";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/persons" element={<Persons />}/>
          <Route path="/persondetail" element={<PersonDetail />}/>
          <Route path="/casefiles" element={<Casefiles />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
