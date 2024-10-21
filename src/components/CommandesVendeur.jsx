import React, { useEffect, useState } from 'react';
import useFetch from '../backend/Services/useFetch';
import useSave from '../backend/Services/useSave';
import '../css/commandes.css';

const CommandesVendeurs = () => {
    const [commandes, setCommandes] = useState([]);
    const [loadingCommandes, setLoadingCommandes] = useState({}); // État de chargement pour chaque commande
    const { data: commandeData, loading, error } = useFetch('users/commande');
    const { saveData } = useSave();
    const [cancelError, setCancelError] = useState(null);

    useEffect(() => {
        if (commandeData && commandeData.orders) {
            setCommandes(commandeData.orders);
        }
    }, [commandeData]);

    const handleCancel = async (id) => {
        setLoadingCommandes(prevState => ({ ...prevState, [id]: true }));
        try {
            await saveData(`users/commande/${id}`, {}, 'DELETE');
            setCommandes(prevCommandes => prevCommandes.filter(commande => commande.id !== id));
            console.log(`Commande ${id} annulée`);
        } catch (error) {
            setCancelError(`${error}`);
        } finally {
            setLoadingCommandes(prevState => ({ ...prevState, [id]: false }));
        }
    };

    const handleValidate = async (id, currentEtat) => {
        setLoadingCommandes(prevState => ({ ...prevState, [id]: true }));
        try {
            const newEtat = currentEtat === 'validee' ? 'non_confirme' : 'validee'; // Toggle between 'validee' and 'non_confirme'
            await saveData(`users/commande/${id}`, { etat: newEtat }, 'PUT'); 
            setCommandes(prevCommandes =>
                prevCommandes.map(commande =>
                    commande.id === id ? { ...commande, etat: newEtat } : commande
                )
            );
            console.log(`Commande ${id} mise à jour avec l'état : ${newEtat}`);
        } catch (error) {
            setCancelError(`${error}`);
        } finally {
            setLoadingCommandes(prevState => ({ ...prevState, [id]: false }));
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
                        {(commande.etat === "non_confirme" || commande.etat === "validee") && (
                            <div className="commande-actions">
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancel(commande.id)}
                                    disabled={loadingCommandes[commande.id]} // Désactive individuellement en fonction de la commande
                                >
                                    {loadingCommandes[commande.id] ? 'Annulation...' : 'Annuler'}
                                </button>
                                <button
                                    className={`validate-button ${commande.etat === 'non_confirme' ? 'non-confirme-button' : ''}`} // Ajouter une classe pour 'non_confirme'
                                    onClick={() => handleValidate(commande.id, commande.etat)}
                                    disabled={loadingCommandes[commande.id]} // Désactive individuellement en fonction de la commande
                                >
                                    {loadingCommandes[commande.id] ? 'Mise à jour...' : commande.etat === 'validee' ? 'Non confirmer' : 'Valider'}
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
