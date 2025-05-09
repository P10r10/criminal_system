import MyNavbar from "../MyNavbar/MyNavbar";
import "./crimeStyle.css";
import {useData} from "../DataContext";
import Button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";
import {useUserContext} from "../UserContext";
import axios from "axios";

function ManageCrimeTypes() {

    const {crimetypes, CRIMETYPES_URL, refreshCrimeTypes} = useData();
    const {userType} = useUserContext();

    const handleRemoveCrimeType = (idToRemove) => {
        axios.delete(CRIMETYPES_URL + idToRemove + "/").then(() => refreshCrimeTypes());
    };

    return (
        <div className="crime-style">
            <MyNavbar/>
            <h1>
                Gerir tipos de crime
                {(userType === "Admin" || userType === "Operador") && (
                    <Button variant="warning">
                        Criar tipo de crime
                    </Button>
                )}
            </h1>
            <div className="table-container">
                <Table striped>
                    <thead>
                    <tr>
                        <th>Value</th>
                        <th>Label</th>
                        <th>Acções</th>
                    </tr>
                    </thead>
                    <tbody>
                    {crimetypes.map((ct) => (
                        <tr key={ct.id}>
                            <td>{ct.value}</td>
                            <td>{ct.label}</td>
                            <td>
                                {(userType === "Admin" || userType === "Operador") && (
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveCrimeType(ct.id)}>Remover</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ManageCrimeTypes;
