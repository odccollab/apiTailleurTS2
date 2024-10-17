import React, { useEffect, useState } from 'react';
import useFetch from '../backend/Services/useFetch'; // Assuming you have this hook

const Commandes = () => {
    const { data: commandes, loading, error } = useFetch('commandes/user'); // Replace with actual endpoint

    if (loading) return <p>Loading commandes...</p>;
    if (error) return <p>Error fetching commandes.</p>;

    return (
        <div className="commandes-container">
            {commandes.length > 0 ? (
                commandes.map((commande) => (
                    <div key={commande.id} className="commande-item">
                        <h3>Commande #{commande.id}</h3>
                        <p>Status: {commande.status}</p>
                        <p>Total: {commande.total}</p>
                    </div>
                ))
            ) : (
                <p>No commandes available.</p>
            )}
        </div>
    );
};

export default Commandes;
