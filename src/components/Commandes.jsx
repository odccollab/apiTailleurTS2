import React, { useEffect, useState } from 'react';
import useFetch from '../backend/Services/useFetch';
import useSave from '../backend/Services/useSave';
import '../css/commandes.css';

const Commandes = () => {
    const [commandes, setCommandes] = useState([]);
    const { data: commandeData, loading, error } = useFetch('users/commande-c');
    const { saveData, isSaving, erro } = useSave();
    const [cancelError, setCancelError] = useState(null);

    useEffect(() => {
        if (commandeData && commandeData.orders) {
            setCommandes(commandeData.orders);
        }
    }, [commandeData]);

    const handleCancel = async (id) => {
        try {
            await saveData(`users/commande/${id}`, {}, 'DELETE');
            setCommandes(prevCommandes => prevCommandes.filter(commande => commande.id !== id));
            console.log(`Commande ${id} annulée`);
        } catch (error) {
            setCancelError(`Erreur lors de l'annulation de la commande #${id}`);
        }
    };

    if (loading) return <p>Chargement des commandes...</p>;
    if (error) return <p>Erreur lors de la récupération des commandes.</p>;

    return (
        <div className="commandes-container">
            {commandes.length > 0 ? (
                commandes.map((commande) => (
                    <div key={commande.id} className="commande-item">
                        <h3>Commande #{commande.id}</h3>
                        <p>Status: {commande.etat}</p>
                        <p>Total: {commande.prixTotal} €</p>
                        {commande.etat === "non confirmé" && (
                            <button
                                className="cancel-button"
                                onClick={() => handleCancel(commande.id)}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Annulation...' : 'Annuler'}
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p className="not-commandes">Aucune commande effectuée.</p>
            )}

            {cancelError && <p className="cancel-error">{cancelError}</p>}
        </div>
    );
};

export default Commandes;
