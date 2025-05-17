import {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useData} from "../DataContext";

function ModalCreatePerson({show, handleClose}) {
    const {PERSONS_URL, refreshPersons} = useData();
    const [inputs, setInputs] = useState({name: "", alias: "", date_of_birth: ""});
    const [image, setImage] = useState(null);

    const handleClickCreatePerson = (e) => {
        e.preventDefault();
        axios
            .post(PERSONS_URL, {
                name: inputs.name,
                alias: inputs.alias || null,
                date_of_birth: inputs.date_of_birth || null,
                image: image
            }, {
                headers: {"Content-Type": "multipart/form-data",},
            })
            .then(() => {
                refreshPersons();
                setInputs({name: "", alias: "", date_of_birth: ""});
                setImage(null);
                handleClose(); // fecha o modal
            });
    };

    const changeHandler = (e) => {
        setInputs((i) => ({...i, [e.target.name]: e.target.value}));
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        if (image) {
            setImage(image);
        } else {
            setImage(null);
        }
    };


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Form onSubmit={handleClickCreatePerson}>
                <Modal.Header closeButton className="bg-warning text-white">
                    <Modal.Title>Criar pessoa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} accept="image/*"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="bg-warning text-white">
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    <Button variant="primary" type="submit">
                        Criar pessoa
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalCreatePerson;
