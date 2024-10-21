import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import useSave from '../../backend/Services/useSave';
import CustomAlert from '../Alert/CustomAlert'; // Import du composant CustomAlert

const ReportModal = ({ show, handleClose, postId }) => {
    const [reportReason, setReportReason] = useState(''); 
    const [alertVisible, setAlertVisible] = useState(false); 
    const [alertConfig, setAlertConfig] = useState({}); 

    const handleReportChange = (e) => setReportReason(e.target.value);

    const { saveData, isSaving, saveError } = useSave();

    const handleSubmitReport = async () => {
        // Validation si la raison est vide
        if (!reportReason.trim()) {
            setAlertConfig({
                title: 'Attention',
                message: 'Veuillez indiquer un motif pour le signalement.',
                icon: 'warning',
                confirmText: 'OK'
            });
            setAlertVisible(true);
            return;
        }

        try {
            // Logique pour envoyer le signalement via API
            await saveData("posts/signale", { "motif": reportReason, "postId": postId });

            // Afficher une alerte de succès
            setAlertConfig({
                title: 'Signalement envoyé',
                message: `Le post a été signalé pour motif : ${reportReason}`,
                icon: 'success',
                confirmText: 'OK'
            });
            setAlertVisible(true);

            // Fermer le modal après la soumission
            handleClose();
            setReportReason(''); // Réinitialiser la raison du signalement
        } catch (error) {
            // Afficher une alerte d'erreur
            setAlertConfig({
                title: 'Erreur',
                message: "Une erreur s'est produite lors de l'envoi du signalement.",
                icon: 'error',
                confirmText: 'OK'
            });
            setAlertVisible(true);
        }
    };

    return (
        <>
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

                    {/* Affiche le bouton de soumission et un indicateur de chargement */}
                    <Button
                        variant="danger"
                        className="w-100 mt-3"
                        onClick={handleSubmitReport}
                        disabled={isSaving}  // Désactiver le bouton pendant la soumission
                    >
                        {isSaving ? 'Envoi en cours...' : 'Envoyer le signalement'}
                    </Button>

                    {/* Affiche une erreur éventuelle (supplémentaire à l'alerte CustomAlert) */}
                    {saveError && <p className="text-danger mt-3">{saveError}</p>}
                </Modal.Body>
            </Modal>

            {/* Composant CustomAlert pour afficher les alertes */}
            <CustomAlert
                show={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                icon={alertConfig.icon}
                confirmText={alertConfig.confirmText}
                onConfirm={() => setAlertVisible(false)} // Ferme l'alerte
            />
        </>
    );
};

export default ReportModal;