import {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";

function ModalCreatePerson({show, handleClose}) {
    const {PERSONS_URL, refreshPersons} = useData();
    const [inputs, setInputs] = useState({name: "", alias: "", date_of_birth: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(PERSONS_URL, {
                name: inputs.name,
                alias: inputs.alias || null,
                date_of_birth: inputs.date_of_birth || null,
            })
            .then(() => {
                refreshPersons();
                setInputs({name: "", alias: "", date_of_birth: ""});
                handleClose(); // fecha o modal
            });
    };

    const changeHandler = (e) => {
        setInputs((i) => ({...i, [e.target.name]: e.target.value}));
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="bg-warning text-white">
                <Modal.Title>Criar pessoa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            maxLength="80"
                            value={inputs.name}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAlias" className="mb-3">
                        <Form.Label>Alcunha</Form.Label>
                        <Form.Control
                            type="text"
                            name="alias"
                            maxLength="32"
                            value={inputs.alias}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDateOfBirth" className="mb-3">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="date_of_birth"
                            value={inputs.date_of_birth}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Criar pessoa
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-warning text-white">
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreatePerson;
