import React, { useState } from 'react';
import useFetch from "../backend/Services/useFetch";
import Follow from './Follow';
import { FollowProvider } from '../context/FollowContext';

// Composant pour le bouton réutilisable
const Button = ({ children, onClick, className }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded focus:outline-none focus:ring ${className}`}
        style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
        }}
    >
        {children}
    </button>
);

// Composant pour le popup
const Popup = ({ children, onClose }) => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    }}>
        <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            maxWidth: '425px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
        }}>
            {children}
            <Button onClick={onClose} className="bg-gray-500 mt-4">
                Fermer
            </Button>
        </div>
    </div>
);

// Composant pour le spinner de chargement
const Loader = () => (
    <div className="loader" style={{
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3b82f6',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: 'auto',
    }}></div>
);

// Ajout de l'animation de rotation
const style = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Composant principal Followings
const Followings = () => {
    const [showFollowings, setShowFollowings] = useState(false);
    const { data, loading, error } = useFetch("users/followings");

    const toggleFollowings = () => {
        setShowFollowings(!showFollowings);
    };

    return (
        <div className="followings-component">
            <style>{style}</style>
            <Button onClick={toggleFollowings} className="bg-blue-500 hover:bg-blue-700">
                {showFollowings ? "Masquer" : `Abonnements (${data && data.data ? data.data.length : 0})`}
            </Button>

            {showFollowings && (
                <Popup onClose={toggleFollowings}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Abonnements</h2>
                    <div>
                        {loading && <Loader />}
                        {error && <p className="text-red-500">Erreur : {error}</p>}
                        {data && data.data && data.data.length > 0 ? (
                         <ul style={{ listStyle: 'none', padding: 0 }}>
                         {data.data.map((following) => (
                             <li key={following._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                     <img
                                         src={following.image}
                                         alt={`${following.prenom} ${following.nom}`}
                                         style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '1rem' }}
                                     />
                                     <span className='text-align m-2 py-2' style={{ fontWeight: 'bold' }}>
                                         {following.prenom} {following.nom}
                                     </span>
                                 </div>
                                 <div>
                                     <FollowProvider>
                                         <Follow followedId={following._id} />
                                     </FollowProvider>
                                 </div>
                             </li>
                         ))}
                     </ul>
                     
                        ) : (
                            !loading && <p>Vous ne suivez aucun utilisateur pour le moment.</p>
                        )}
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default Followings;