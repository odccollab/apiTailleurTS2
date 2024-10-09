import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReportModal from './ReportModal'; // Import du composant de signalement

const OptionsModal = ({ show, handleClose, postId }) => {
  const [showReportModal, setShowReportModal] = useState(false); // Contrôle du modal de signalement

  const handleReportModal = () => {
    setShowReportModal(true); // Ouvrir le modal de signalement
    handleClose(); // Fermer le modal des options
  };

  const handleCloseReportModal = () => setShowReportModal(false);

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
          <Button variant="primary" className="w-100 mb-2" >
         Partager
        </Button>
        <Button variant="danger" className="w-100 mb-2" >
         supprimer
        </Button>
          {/* Autres options ici */}
          <Button variant="secondary" className="w-100" onClick={handleClose}>
            Annuler
          </Button>
        </Modal.Body>
      </Modal>
      {/* Modal de signalement */}
      <ReportModal show={showReportModal} handleClose={handleCloseReportModal} postId={postId} />
    </>
  );
};

export default OptionsModal;
