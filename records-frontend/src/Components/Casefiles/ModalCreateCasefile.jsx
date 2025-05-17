import React, {useEffect, useRef, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";
import Select from "react-select";

function ModalCreateCasefile({show, handleClose}) {
    const {crimetypes, CASEFILES_URL, refreshCasefiles, statusChoices} = useData();
    const [crimeType, setCrimeType] = useState(null);
    const [crimeDate, setCrimeDate] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pendente");
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
            description: description,
            status: status
        }).then(() => {
            refreshCasefiles();
            resetForm();
            handleClose(); // fecha o modal
        });
    };

    const resetForm = () => {
        setCrimeType(null);
        setCrimeDate("");
        setDescription("");
        setStatus("Pendente");
    };

    const onClose = () => {
        resetForm();
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="bg-warning text-white">
                <Modal.Title>Criar processo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select name="statusOptions"
                                     id="statusSelect"
                                     value={status}
                                     onChange={(e) => setStatus(e.target.value)}>
                            {statusChoices.map(sc => <option key={sc.value} value={sc.value}>{sc.label}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-warning text-white">
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleCreateCasefile}>
                    Criar processo
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateCasefile;
