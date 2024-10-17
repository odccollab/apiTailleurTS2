import React, { useState, useEffect, memo } from 'react';
import { Modal, Button, ListGroup, Form, Spinner, Alert } from 'react-bootstrap';
import '../../css/shareModal.css';
import useFetch from '../../backend/Services/useFetch';
import useSave from '../../backend/Services/useSave'; // Importer le hook useSave

// Composant réutilisable pour afficher un contact
const ContactItem = memo(({ contact, isSelected, onSelect }) => (
    <ListGroup.Item
        key={contact.id}
        active={isSelected}
        onClick={() => onSelect(contact)}
        className={`user-item ${isSelected ? 'selected' : ''}`}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    >
        <img
            src={contact.image}
            alt={contact.nom}
            className="rounded-circle"
            width="50"
            height="50"
        />
        <div style={{ flex: 1, marginLeft: '10px' }}>
            <div style={{ fontWeight: 'bold' }}>{contact.nom} {contact.prenom}</div>
            <div className="username">@{contact.nom}{contact.prenom}</div>
        </div>
        {isSelected && <span className="badge bg-primary">Sélectionné</span>}
    </ListGroup.Item>
));

const ShareModal = ({ show, handleClose, postId }) => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);

    // Récupération des amis mutuels et suggérés
    const { data: mutualFriendsData, loading: mutualLoading, error: mutualError } = useFetch('users/mutual-friends');
    const { data: suggestedFriendsData, loading: suggestedLoading, error: suggestedError } = useFetch('users/suggested-friends');

    const { saveData, isSaving, saveError } = useSave(); // Utilisation de useSave pour enregistrer les partages

    const loading = mutualLoading || suggestedLoading;
    const error = mutualError || suggestedError;

    // Met à jour la liste des contacts selon la disponibilité des amis
    useEffect(() => {
        if (mutualFriendsData?.mutualFriends?.length > 0) {
            setContacts(mutualFriendsData.mutualFriends);
        } else if (suggestedFriendsData?.suggestedFriends?.length > 0) {
            setContacts(suggestedFriendsData.suggestedFriends);
        }
    }, [mutualFriendsData, suggestedFriendsData]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSelectContact = (contact) => {
        // Comparer par id au lieu de comparer l'objet entier
        setSelectedContacts(prev =>
            prev.some(c => c.id === contact.id)
                ? prev.filter(c => c.id !== contact.id)
                : [...prev, contact]
        );
    };

    const handleShare = async () => {
        const userIds = selectedContacts.map(contact => contact.id); // Obtenir les IDs des utilisateurs sélectionnés
        try {
            const results= await saveData("posts/share", { postId, userIds }); // Appeler l'API de partage
            console.log(results);
            console.log("Partagé avec :", userIds);
            handleClose();
        } catch (error) {
            console.error("Erreur lors du partage :", error);
        }
    };

    // Filtrer les contacts selon la recherche
    const filteredContacts = contacts.filter(contact =>
        contact.nom.toLowerCase().includes(search.toLowerCase()) ||
        contact.prenom.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Partager avec...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Chargement...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <Alert variant="danger">
                        Une erreur s'est produite: {error}
                    </Alert>
                ) : (
                    <>
                        <Form.Control
                            type="text"
                            placeholder="Rechercher un contact"
                            value={search}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        <div className="user-list mt-3">
                            {filteredContacts.length > 0 ? (
                                <ListGroup>
                                    {filteredContacts.map((contact) => (
                                        <ContactItem
                                            key={contact.id}
                                            contact={contact}
                                            isSelected={selectedContacts.some(c => c.id === contact.id)}
                                            onSelect={handleSelectContact}
                                        />
                                    ))}
                                </ListGroup>
                            ) : (
                                <p className="text-center">Aucun contact trouvé.</p>
                            )}
                        </div>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Écrire un message..."
                            className="mt-3"
                        />
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={handleShare}
                    disabled={selectedContacts.length === 0 || isSaving} // Désactiver le bouton lors de l'enregistrement
                >
                    {isSaving ? <Spinner animation="border" size="sm" /> : `Envoyer (${selectedContacts.length})`}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShareModal;