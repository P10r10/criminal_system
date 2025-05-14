import React, {useEffect, useRef, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";
import Select from 'react-select';
import {format} from "date-fns";

function ModalAssociatePerson({show, handleClose, availablePersons, casefile}) {
    const {PERSONCASEFILES_URL, refreshPersonCasefiles} = useData();
    const [personId, setPersonId] = useState(null);
    const inputRef = useRef(null);

    const availablePersonsMapped = availablePersons.map((person) =>
        ({
            value: person.id,
            label: person.id + " - " + person.name + " " +
                (person.alias ? "(" + person.alias + ")" : "") + " - " +
                (person.date_of_birth ? format(new Date(person.date_of_birth), "dd/MM/yyyy") : "Sem DN")
        }));

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus(); // Põe o focus no input quando se abre o modal
        }
        if (!show) {
            setPersonId(null); // limpa se fechar o modal
        }
    }, [show]);

    const handleAssociatePersonCasefile = (e) => {
        e.preventDefault();
        // alert("pid: " + personId);
        // alert("case id: " + casefile.id);
        axios.post(PERSONCASEFILES_URL, {person: personId, casefile: casefile.id,})
            .then(() => {
                refreshPersonCasefiles();
                setPersonId(null);
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
                <Modal.Title>Associar pessoa ao processo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAssociatePersonCasefile}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Pessoa a associar</Form.Label>
                        <Select
                            ref={inputRef}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Escolha..."
                            options={availablePersonsMapped}
                            noOptionsMessage={() => "Nenhuma pessoa encontrada"}
                            onChange={(option) => {
                                const person_id = option ? option.value : null;
                                setPersonId(person_id);
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
