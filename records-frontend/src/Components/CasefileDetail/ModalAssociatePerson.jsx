import React, {useEffect, useRef, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";
import Select from 'react-select';

function ModalAssociatePerson({show, handleClose, availableCaseFiles, person}) {
    const {PERSONCASEFILES_URL, refreshPersonCasefiles} = useData();
    const [casefileId, setCasefileId] = useState(null);
    const inputRef = useRef(null);

    const availableCaseFilesMapped = availableCaseFiles.map((cf) =>
        ({value: cf.id, label: cf.id + "/" + cf.year + " - " + cf.crime}));

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus(); // Põe o focus no input quando se abre o modal
        }
        if (!show) {
            setCasefileId(null); // limpa se fechar o modal
        }
    }, [show]);

    const handleAssociatePersonCasefile = (e) => {
        e.preventDefault();
        axios.post(PERSONCASEFILES_URL, {person: person.id, casefile: casefileId,})
            .then(() => {
                refreshPersonCasefiles();
                setCasefileId(null);
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
                <Modal.Title>Associar processo à pessoa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAssociatePersonCasefile}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Processo a associar</Form.Label>
                        <Select
                            ref={inputRef}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Escolha..."
                            options={availableCaseFilesMapped}
                            noOptionsMessage={() => "Nenhum processo encontrado"}
                            onChange={(option) => {
                                const case_id = option ? option.value : null;
                                setCasefileId(case_id);
                            }}
                            required
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">Associar</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-warning text-white">
                <Button variant="secondary" onClick={handleClose}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAssociatePerson;
