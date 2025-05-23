import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({messageTitle="", message = "", styles = "", onClose}) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        if (onClose) onClose(); // notifica componente pai que Popup fechou
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton className={styles}>
                <Modal.Title>{messageTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer className={styles}>
                <Button variant="primary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup;
