import MyNavbar from "../MyNavbar/MyNavbar";
import "./usersStyle.css";
import Button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";
import {useUserContext} from "../UserContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ManageUsers() {

    const {USERS_URL, refreshUsers, users} = useUserContext();
    const {userType} = useUserContext();
    const navigate = useNavigate();

    const handleRemoveUser = (idToRemove) => {
        axios.delete(USERS_URL + idToRemove + "/").then(() => refreshUsers());
    };

    const handleToggleSuper = (user) => {
        axios.put(USERS_URL + user.id + "/", {...user, is_superuser: !user.is_superuser})
            .then(() => refreshUsers());
    }
    const handleToggleStaff = (user) => {
        axios.put(USERS_URL + user.id + "/", {...user, is_staff: !user.is_staff})
            .then(() => refreshUsers());
    }

    return (
        <div className="user-style">
            <MyNavbar/>
            <h1>Gerir utilizadores</h1>
            <div className="button-group">
                <Button variant="warning" onClick={() => navigate("/main")}>Voltar</Button>
            </div>
            <div className="table-container">
                <Table striped>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Is_superuser</th>
                        <th>Is_staff</th>
                        <th>Acções</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.is_superuser ? "X" : ""}</td>
                            <td>{user.is_staff ? "X" : ""}</td>
                            <td>
                                {user.username === "admin" ? (<></>) : ( // para não se remover o admin
                                    userType === "Admin" && (
                                        <>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleRemoveUser(user.id)}
                                            >Remover</Button>
                                            <Button
                                                variant="success"
                                                onClick={() => handleToggleSuper(user)}
                                            >Super</Button>
                                            <Button variant="success"
                                                    onClick={() => handleToggleStaff(user)}
                                            >Staff</Button>
                                        </>)
                                )
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ManageUsers;
