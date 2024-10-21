import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CustomAlert from '../Alert/CustomAlert'; // Import du CustomAlert
import '../../css/rechargeCredit.css'; // Ajouter du style personnalisé
import useSave from '../../backend/Services/useSave';

const RechargeCreditModal = ({ show, handleClose, userId, onCreditUpdate }) => { // Ajout de onCreditUpdate dans les props
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { saveData, isSaving, saveError } = useSave();
    const [alertVisible, setAlertVisible] = useState(false); // État pour afficher l'alerte
    const [alertConfig, setAlertConfig] = useState({}); // Configuration de l'alerte

    const handleAmountChange = (e) => setAmount(e.target.value);

    const handleRecharge = async () => {
        if (parseInt(amount) < 1000) {
            // Configuration de l'alerte pour un montant insuffisant
            setAlertConfig({
                title: 'Montant insuffisant',
                message: 'Le montant doit être supérieur ou égal à 1000.',
                icon: 'error',
                confirmText: 'OK',
            });
            setAlertVisible(true);
            return;
        }

        setIsSubmitting(true);

        try {
            // Appel à une API pour ajouter du crédit
            const response = await saveData("users/achatCredit", { amount: amount });
            
            if (response.success) {
                // Met à jour le crédit via la fonction passée par les props
                onCreditUpdate(response.credits); // Appel de la fonction onCreditUpdate
                // Configuration de l'alerte pour un succès
                setAlertConfig({
                    title: 'Crédit rechargé',
                    message: `Votre crédit a été rechargé avec succès. Vous avez maintenant ${response.credits} crédits.`,
                    icon: 'success',
                    confirmText: 'OK',
                });
                setAlertVisible(true);
                handleClose();
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            // Configuration de l'alerte pour une erreur
            setAlertConfig({
                title: 'Erreur',
                message: error.message || "Une erreur s'est produite lors du rechargement.",
                icon: 'error',
                confirmText: 'OK',
            });
            setAlertVisible(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Recharger du Crédit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="amount">
                        <Form.Label>Montant à recharger</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Entrez le montant"
                            value={amount}
                            onChange={handleAmountChange}
                            min="1000"
                        />
                    </Form.Group>
                    <Button
                        variant="success"
                        className="w-100 mt-3"
                        onClick={handleRecharge}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Chargement...' : 'Acheter Crédit'}
                    </Button>
                </Modal.Body>
            </Modal>

            {/* Composant CustomAlert pour gérer les alertes */}
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

export default RechargeCreditModal;
