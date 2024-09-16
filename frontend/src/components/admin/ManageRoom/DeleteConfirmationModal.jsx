// src/components/DeleteConfirmationModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onConfirmDelete }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa phòng này?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onConfirmDelete}>Xóa</Button>
                <Button variant="secondary" onClick={onHide}>Hủy</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;
