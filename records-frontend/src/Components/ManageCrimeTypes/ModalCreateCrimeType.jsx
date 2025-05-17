import {useEffect, useRef, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";

function ModalCreateCrimeType({show, handleClose}) {
    const {CRIMETYPES_URL, refreshCrimeTypes} = useData();
    const [crimeType, setCrimeType] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus(); // Põe o focus no input quando se abre o modal
        }
    }, [show]);

    const handleClickCreateCrimeType = (e) => {
        e.preventDefault();
        axios.post(CRIMETYPES_URL, {value: crimeType, label: crimeType}).then(() => {
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
            keyboard={false}>
            <Form onSubmit={handleClickCreateCrimeType}>
                <Modal.Header closeButton className="bg-warning text-white">
                    <Modal.Title>Criar tipo de crime</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de crime</Form.Label>
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
                </Modal.Body>
                <Modal.Footer className="bg-warning text-white">
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit">
                        Criar tipo de crime
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalCreateCrimeType;
