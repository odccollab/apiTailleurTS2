import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReportModal from './ReportModal'; // Import du composant de signalement
// Import du composant ShareModal reste ici, pas de modification
import ShareModal from './ShareModal.jsx';

const OptionsModal = ({ show, handleClose, postId }) => {
    const [showReportModal, setShowReportModal] = useState(false); // Contrôle du modal de signalement
    const [showShareModal, setShowShareModal] = useState(false);

    const handleReportModal = () => {
        setShowReportModal(true); // Ouvrir le modal de signalement
        handleClose(); // Fermer le modal des options
    };

    const handleCloseReportModal = () => setShowReportModal(false);
    const handleCloseShareModal = () => setShowShareModal(false);

    const handleOpenShareModal = () => {
        setShowShareModal(true); // Ouvre le modal de partage
        handleClose(); // Ferme le modal d'options
    };

    return (
        <>
            {/* Modal pour les options */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="danger" className="w-100 mb-2" onClick={handleReportModal}>
                        Signaler
                    </Button>
                    <Button variant="primary" className="w-100 mb-2" onClick={handleOpenShareModal}>
                        Partager
                    </Button>
                    <Button variant="danger" className="w-100 mb-2">
                        Supprimer
                    </Button>
                    {/* Autres options ici */}
                    <Button variant="secondary" className="w-100" onClick={handleClose}>
                        Annuler
                    </Button>
                </Modal.Body>
            </Modal>

            {/* Modal de signalement */}
            <ReportModal show={showReportModal} handleClose={handleCloseReportModal} postId={postId} />

            {/* Modal de partage */}
            {showShareModal && (
                <ShareModal show={showShareModal} handleClose={handleCloseShareModal} postId={postId} />
            )}
        </>
    );
};

export default OptionsModal;