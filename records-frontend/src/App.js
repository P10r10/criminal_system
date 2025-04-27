import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Persons from "./Persons";
import Casefiles from "./Casefiles";
import PersonDetail from "./PersonDetail";
import CasefileDetail from "./CasefileDetail";
import {DataProvider} from "./DataContext";

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
              </Routes>
          </BrowserRouter>
      </DataProvider>
  );
}

export default App;


// TODO
// Alterar estado no detalhe do processo
// ver pessoas no detalhe do processo
// criar pessoas no detalhe do processo
// apagar pessoas no detalhe do processo


// criar mais fields Person
// Associar fotos pessoas
// NO FIM - embelezar com primereact ou assim


//no processo acrescentar data de ocorrência FACULTATIVO?
//pedir confirmação antes de eliminar processo na Pessoa
//nas views falta PUT linha 56

//apagar pessoas
//apagar processos

//Perguntar Prof. lista json com crimes VS backend Django

//GET /records/api/persons/:id/ to fetch a single person. HERE***
//onClick={() => navigate(`/persondetail/${person.id}`)}
//axios.get(`${PERSONS_URL}${person_id}/`), // Fetch person by ID