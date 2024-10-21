import  { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'react-bootstrap';
import ReportModal from './ReportModal'; // Import du composant de signalement
// Import du composant ShareModal reste ici, pas de modification
import ShareModal from './ShareModal.jsx';
import useSave from '../../backend/Services/useSave';
import Swal from 'sweetalert2';

const OptionsModal = ({ show, handleClose, postId, onPostDeleted}) => {
    const [showReportModal, setShowReportModal] = useState(false); // Contrôle du modal de signalement
    const [showShareModal, setShowShareModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleReportModal = () => {
        setShowReportModal(true); // Ouvrir le modal de signalement
        handleClose(); // Fermer le modal des options
    };

    const handleCloseReportModal = () => setShowReportModal(false);
    const { saveData} = useSave();
    const handleCloseShareModal = () => setShowShareModal(false);

    const handleOpenShareModal = () => {
        setShowShareModal(true); // Ouvre le modal de partage
        handleClose(); // Ferme le modal d'options
    };

    const handleDeletePost = async () => {
        try {
          await saveData(`posts/${postId}`, {}, 'DELETE');
          handleClose();
          if (onPostDeleted) {
            onPostDeleted(postId);
          }
          Swal.fire({
            title: 'Supprimé !',
            text: 'Votre post a été supprimé avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch (error) {
          console.error('Erreur détaillée lors de la suppression du post:', error);
          Swal.fire({
            title: 'Erreur !',
            text: `Échec de la suppression du post: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
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
                    <Button variant="danger" className="w-100 mb-2" onClick={handleDeletePost}>
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

OptionsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    onPostDeleted: PropTypes.func.isRequired,
  };

export default OptionsModal;