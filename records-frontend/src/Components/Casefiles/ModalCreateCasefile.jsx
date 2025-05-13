import React, {useEffect, useRef, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";
import Select from "react-select";

function ModalCreateCasefile({show, handleClose}) {
    const {crimetypes, CASEFILES_URL, refreshCasefiles} = useData();
    const [crimeType, setCrimeType] = useState(null);
    const [crimeDate, setCrimeDate] = useState(null);
    const [description, setDescription] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus(); // Põe o focus no input quando se abre o modal
        }
    }, [show]);

    const handleCreateCasefile = (e) => {
        e.preventDefault();
        axios.post(CASEFILES_URL, {
            crime: crimeType,
            crime_date: crimeDate,
            description: description
        }).then(() => {
            refreshCasefiles();
            setCrimeType(null);
            setCrimeDate(null);
            handleClose(); // fecha o modal
        });
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="bg-warning text-white">
                <Modal.Title>Criar processo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreateCasefile}>
                    <Form.Group className="mb-3">
                        <Form.Label>Crime</Form.Label>
                        <Select
                            ref={inputRef}
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Escolha..."
                            options={crimetypes}
                            noOptionsMessage={() => "Nenhum crime encontrado"}
                            onChange={(option) => {
                                const crime = option ? option.value : null;
                                setCrimeType(crime);
                            }}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Data da ocorrência</Form.Label>
                        <Form.Control
                            type="date"
                            value={crimeDate}
                            onChange={(e) => setCrimeDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Group className="mb-3">
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Criar processo
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

export default ModalCreateCasefile;
