import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteModal = ({ handleClose, handleShow, show }) => {

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-success">Dleted Successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-secondary'>A student's profile has been successfully deleted!</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;