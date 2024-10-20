import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer l'ID de l'utilisateur à partir de l'URL
import { FaUserPlus, FaFileAlt, FaCreditCard, FaUserFriends, FaUserCheck } from 'react-icons/fa';
import { Tabs, Tab } from '@mui/material';
import useFetch from '../backend/Services/useFetch'; // Hook pour récupérer les données utilisateur
import useInfiniteScroll from '../backend/Services/useInfiniteScroll'; // Hook pour l'infinite scroll
import RechargeCreditModal from './modals/RechargeCreditModal';
import CreditCard from './CreditCard';
import CustomAlert from './Alert/CustomAlert';
import PostItem from './PostItem';

import Articles from './Articles';
import Commandes from './Commandes';
import Followers from './Followers';
import Followings from './Following';
import { DotTyping } from './DotTyping';
import Favorites from './Favorites';
import '../css/userProfile.css';

const UserProfile = () => {
    const { idUser } = useParams(); // Récupère l'ID de l'utilisateur à partir de l'URL
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({});
    const [activeTab, setActiveTab] = useState(0);

    // Condition ternaire pour déterminer si nous devons récupérer le profil d'un utilisateur spécifique ou celui de l'utilisateur connecté
    const profileUrl = idUser ? `users/profile/${idUser}` : "users/profile";

    // Fetch des données du profil utilisateur avec useFetch
    const { data: userData, loading: userLoading, error: userError } = useFetch(profileUrl);
console.log(userData);
    // Utiliser la même logique pour les posts de l'utilisateur
    const postEndpoint = userData?.user?.id ? `posts/postall-user?userId=${userData.user.id}` : `posts/postall-user?userId=${idUser}`;
    const dataHandler = (newData) => ({
        posts: [...(data.posts || []), ...(newData.posts || [])],
    });

    // Utilisation d'un infinite scroll pour les publications de l'utilisateur
    const {
        data = { posts: [] },
        loading,
        hasMore
    } = useInfiniteScroll(postEndpoint, 10, { posts: [] }, dataHandler);

    // Effet pour gérer la récupération des données utilisateur et les erreurs
    useEffect(() => {
        if (userData) {
            setUser(userData.user);
        }
        if (userError) {
            setAlertConfig({
                title: 'Erreur',
                message: userError,
                icon: 'error',
                confirmText: 'OK',
            });
            setAlertVisible(true);
        }
    }, [userData, userError]);

    // Fonction pour mettre à jour le crédit après un achat
    const handleCreditUpdate = (newCredit) => {
        setUser((prevUser) => ({
            ...prevUser,
            credit: newCredit,
        }));
    };

    // Changement d'onglet (Posts, Articles, Commandes, etc.)
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (userLoading) return <p>Chargement...</p>; // Affichage pendant le chargement des données

    return (
        <div className="profile-container">
            {user && (
                <>
                    <div className="profile-header">
                        <img
                            src={user.image || "/images/uifaces-popular-image.jpg"}
                            alt="profile"
                            className="profile-image"
                        />
                        <h1 className="profile-name">{user.prenom}</h1>
                        <p className="profile-username">@{user.nom}</p>
                        <div className="profile-stats">
                            <button className="stat-button">
                                <FaFileAlt className="icon" /> <strong>{data?.posts?.length}</strong> Publications
                            </button>
                            <button className="stat-button">
                                <FaUserFriends className="icon" /> <strong>{user.followers}</strong> 
                                <div className="followers-container">
                                    <Followers userId={user?.id} />
                                </div>
                            </button>
                            <button className="stat-button">
                                <FaUserCheck className="icon" /> <strong>{user.following}</strong> 
                                <div className="followings-container">
                                    <Followings userId={user?.id} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Carte de crédit */}
                    <CreditCard credit={user?.credit} />

                    <div className="profile-actions">
                        <button className="follow-button">
                            <FaUserPlus className="icon" /> Follow
                        </button>
                        <button className="contact-button">Contact</button>
                        <button className="credit-button" onClick={() => setShowModal(true)}>
                            <FaCreditCard className="icon" /> Buy Credit
                        </button>
                    </div>
                </>
            )}

            {/* Onglets pour Posts, Articles, Commandes, etc. */}
            <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="Posts" />
                <Tab label="Articles" />

                {/* Afficher "Commandes" et "Favorites" uniquement si idUser n'est pas défini */}
                {!idUser && <Tab label="Commandes" />}
                {!idUser && <Tab label="Favorites" />}
            </Tabs>

            {activeTab === 0 && (
                <div className="posts-container">
                    {data?.posts?.length > 0 ? (
                        data.posts.map((post, index) => (
                            <PostItem
                            key={post.id}
                            userImage={`${post.user?.image || '/images/default-user.jpg'}`}
                            userName={`${post.user?.prenom || 'Utilisateur'} ${post.user?.nom || ''}`}
                            timeAgo={new Date(post.createdAt).toLocaleString()}
                            content={post.contenu || 'Pas de contenu'}
                            media={post.contenuMedia || ''}
                            likes={post.likes || "0"}
                            comments={post.comments || "0"}
                            id={post.id}
                            views={Array.isArray(post.viewers) ? post.viewers.length : post.viewers || 0}  
                            idUser={post.user?.id}
                        />
                        
                        ))
                    ) : (
                        <p>Aucun post disponible.</p>
                    )}
                    
                    {hasMore && <DotTyping />}
                    {!hasMore && data?.posts?.length > 0 && <div>Vous avez tout vu !</div>}
                </div>
            )}

            {activeTab === 1 && <Articles />}
            {activeTab === 2 && <Commandes />}
            {activeTab === 3 && <Favorites />}

            {/* Recharge de crédit */}
            <RechargeCreditModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                userId={user?.id}
                onCreditUpdate={handleCreditUpdate}
            />

            {/* Alerte personnalisée */}
            <CustomAlert
                show={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                icon={alertConfig.icon}
                confirmText={alertConfig.confirmText}
                onConfirm={() => setAlertVisible(false)}
            />
        </div>
    );
};

export default UserProfile;
