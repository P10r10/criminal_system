import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalCreatePerson({show, handleClose}) {
    return (
        <Modal show={show}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
        >
            <Modal.Header closeButton className="bg-warning text-white">
                <Modal.Title>Criar pessoa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer className="bg-warning text-white">
                <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                <Button variant="primary">Criar pessoa</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreatePerson;
