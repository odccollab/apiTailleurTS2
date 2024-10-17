import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaFileAlt, FaCreditCard, FaUserFriends, FaUserCheck } from 'react-icons/fa'; // Import des icônes
import '../css/userProfile.css';
import useFetch from '../backend/Services/useFetch';
import RechargeCreditModal from './modals/RechargeCreditModal'; // Import du composant modal
import CreditCard from './CreditCard'; // Import du composant CreditCard
import CustomAlert from './Alert/CustomAlert'; // Import du composant CustomAlert

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer le modal
    const [alertVisible, setAlertVisible] = useState(false); // État pour afficher l'alerte
    const [alertConfig, setAlertConfig] = useState({});

    const { data, loading, error } = useFetch("users/profile");

    // Met à jour l'état une fois les données récupérées
    useEffect(() => {
        if (data) {
            setUser(data.user);
            setPosts(data.user.posts);
        }

        // Afficher une alerte en cas d'erreur
        if (error) {
            setAlertConfig({
                title: 'Erreur',
                message: error,
                icon: 'error',
                confirmText: 'OK',
            });
            setAlertVisible(true);
        }
    }, [data, error]);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="profile-container">
            {user && (
                <>
                    <div className="profile-header">
                        <img
                            src={user.image || "apiTailleurTS2/src/images/uifaces-popular-image.jpg"}
                            alt="profile"
                            className="profile-image"
                        />
                        <h1 className="profile-name">{user.prenom}</h1>
                        <p className="profile-username">@{user.nom}</p>
                        <div className="profile-stats">
                            <button className="stat-button">
                                <FaFileAlt className="icon" /> <strong>{posts.length}</strong> Publications
                            </button>
                            <button className="stat-button">
                                <FaUserFriends className="icon" /> <strong>{user.followers}</strong> Abonnés
                            </button>
                            <button className="stat-button">
                                <FaUserCheck className="icon" /> <strong>{user.following}</strong> Abonnements
                            </button>
                        </div>
                    </div>

                    {/* Ajout du composant CreditCard ici */}
                    <CreditCard credit={user.credit} />

                    <div className="profile-actions">
                        <button className="follow-button">
                            <FaUserPlus className="icon" /> Follow
                        </button>
                        <button className="contact-button">
                            Contact
                        </button>
                        <button className="credit-button" onClick={() => setShowModal(true)}>
                            <FaCreditCard className="icon" /> Buy Credit
                        </button>
                    </div>
                </>
            )}

            {posts.length > 0 ? (
                <div className="posts-container">
                    {posts.map(post => (
                        <div key={post.id} className="post-item">
                            <img
                                src={post.contenuMedia || "/images/default-post.jpg"}
                                alt={post.alt || "Post image"}
                                className="post-image"
                            />
                            <div className="post-content">
                                <h3>{post.content}</h3>
                                <p>{post.alt}</p>
                                <div className="post-meta">
                                    <span>{post.likes} likes</span>
                                    <span>{post.comments} commentaires</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun post disponible.</p>
            )}

            {/* Modal pour recharger le crédit */}
            <RechargeCreditModal show={showModal} handleClose={() => setShowModal(false)} userId={user?.id} />

            {/* Composant CustomAlert pour gérer les alertes */}
            <CustomAlert
                show={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                icon={alertConfig.icon}
                confirmText={alertConfig.confirmText}
                onConfirm={() => setAlertVisible(false)} // Ferme l'alerte
            />
        </div>
    );
};

export default UserProfile;