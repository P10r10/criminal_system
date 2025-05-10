import {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";

function ModalCreateCrimeType({show, handleClose}) {
    const {CRIMETYPES_URL, refreshCrimeTypes} = useData();
    const [inputs, setInputs] = useState({value: "", label: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(inputs.value);
        axios
            .post(CRIMETYPES_URL, {
                value: inputs.value,
                label: inputs.label
            })
            .then(() => {
                refreshCrimeTypes();
                setInputs({value: "", label: ""});
                handleClose(); // fecha o modal
            });
    };

    const changeHandler = (e) => {
        // console.log("Entering change handler");
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
                <Modal.Title>Criar tipo de crime</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Value</Form.Label>
                        <Form.Control
                            type="text"
                            name="value"
                            maxLength="30"
                            value={inputs.value}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAlias" className="mb-3">
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                            type="text"
                            name="label"
                            maxLength="30"
                            value={inputs.label}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Criar tipo de crime
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

export default ModalCreateCrimeType;
