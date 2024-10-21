import React, { useEffect, useState } from 'react';
import useFetch from '../backend/Services/useFetch';
import useSave from '../backend/Services/useSave';
import '../css/commandes.css';

const CommandesVendeurs = () => {
    const [commandes, setCommandes] = useState([]);
    const { data: commandeData, loading, error } = useFetch('users/commande');
    console.log(commandeData);
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

    const handleValidate = async (id) => {
        try {
            await saveData(`users/commande/${id}`, {}, 'PUT'); 
            setCommandes(prevCommandes =>
                prevCommandes.map(commande =>
                    commande.id === id ? { ...commande, etat: 'confirmé' } : commande
                )
            );
            console.log(`Commande ${id} validée`);
        } catch (error) {
            setCancelError(`Erreur lors de la validation de la commande #${id}`);
        }
    };

    if (loading) return <p>Chargement des commandes...</p>;
    
    if (error) return <p>{error}</p>;

    return (
        <div className="commandes-container">
            {commandes.length > 0 ? (
                commandes.map((commande) => (
                    <div key={commande.id} className="commande-item">
                        <h3>Commande #{commande.id}</h3>
                        <p>Status: {commande.etat}</p>
                        <p>Total: {commande.prixTotal} €</p>
                        {commande.etat === "non confirmé" && (
                            <div className="commande-actions">
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancel(commande.id)}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Annulation...' : 'Annuler'}
                                </button>
                                <button
                                    className="validate-button"
                                    onClick={() => handleValidate(commande.id)}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Validation...' : 'Valider'}
                                </button>
                            </div>
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

export default CommandesVendeurs;
