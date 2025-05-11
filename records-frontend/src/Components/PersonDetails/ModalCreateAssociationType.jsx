import {useEffect, useRef, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";

function ModalCreateAssociationType({show, handleClose, availableCaseFiles}) {
    const {CRIMETYPES_URL, refreshCrimeTypes} = useData();
    const [crimeType, setCrimeType] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus(); // Põe o focus no input quando se abre o modal
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(CRIMETYPES_URL, {
                value: crimeType,
                label: crimeType
            })
            .then(() => {
                refreshCrimeTypes();
                setCrimeType("");
                handleClose(); // fecha o modal
            });
    };

    const changeHandler = (e) => {
        setCrimeType(e.target.value);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="bg-warning text-white">
                <Modal.Title>Associar processo à pessoa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Processo a associar</Form.Label>
                        <Form.Control
                            ref={inputRef}
                            type="text"
                            name="value"
                            maxLength="30"
                            value={crimeType}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">Associar</Button>
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

export default ModalCreateAssociationType;
