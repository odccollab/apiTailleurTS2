import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReportModal = ({ show, handleClose, postId }) => {
    const [reportReason, setReportReason] = useState(''); // Stocker la raison du signalement

    const handleReportChange = (e) => setReportReason(e.target.value);

    const handleSubmitReport = () => {
        console.log(`Post ${postId} signalé pour: ${reportReason}`);
        // Logique pour envoyer le signalement (par exemple, via API)
        handleClose(); // Fermer le modal après soumission
        setReportReason(''); // Réinitialiser la raison
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Signaler le post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="reportReason">
                    <Form.Label>Motif du signalement</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Indiquez le motif"
                        value={reportReason}
                        onChange={handleReportChange}
                    />
                </Form.Group>
                <Button variant="danger" className="w-100 mt-3" onClick={handleSubmitReport}>
                    Envoyer le signalement
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default ReportModal;