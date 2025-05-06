import {DataProvider} from "./DataContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Persons from "./Persons";
import Casefiles from "./Casefiles";
import PersonDetail from "./PersonDetail";
import CasefileDetail from "./CasefileDetail";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
      <DataProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Main/>}/>
                  <Route path="/persons" element={<Persons/>}/>
                  <Route path="/persondetail" element={<PersonDetail/>}/>
                  <Route path="/casefiles" element={<Casefiles/>}/>
                  <Route path="/casefiledetail" element={<CasefileDetail/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/login" element={<Login/>}/>
              </Routes>
          </BrowserRouter>
      </DataProvider>
  );
}

export default App;


// Alterar estado no detalhe do processo TODO ***
// FALTA ACTUALIZAR UI - CENTRALIZAR??? TODO ***
// ver pessoas no detalhe do processo
// criar pessoas no detalhe do processo
// apagar pessoas no detalhe do processo


// criar mais fields Person
// Associar fotos pessoas
// NO FIM - embelezar com primereact ou assim


//no processo acrescentar data de ocorrência FACULTATIVO?
//nas views falta PUT linha 56

//apagar pessoas
//apagar processos


//GET /records/api/persons/:id/ to fetch a single person. ???
//onClick={() => navigate(`/persondetail/${person.id}`)}
//axios.get(`${PERSONS_URL}${person_id}/`), // Fetch person by ID

//many_to_many
//tratar dados no backend
//crimes podem ser editados pelo operador e admin
