import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaFileAlt, FaCreditCard, FaUserFriends, FaUserCheck } from 'react-icons/fa';
import { Tabs, Tab } from '@mui/material';
import useFetch from '../backend/Services/useFetch';
import useInfiniteScroll from '../backend/Services/useInfiniteScroll'; // Import du hook d'infinite scroll
import RechargeCreditModal from './modals/RechargeCreditModal';
import CreditCard from './CreditCard';
import CustomAlert from './Alert/CustomAlert';
import PostItem from './PostItem';
import '../css/userProfile.css';
import Articles from './Articles';
import Commandes from './Commandes';
import Followers from './Followers';
import Followings from './Following';
import { DotTyping } from './DotTyping';
import Favorites from './Favorites';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({});
    const [activeTab, setActiveTab] = useState(0);

    const { data: userData, loading: userLoading, error: userError } = useFetch("users/profile");

    const postEndpoint = userData?.user?.id ? `posts/postall-user?userId=${userData.user.id}` : 'posts/postall-user';
    const dataHandler = (newData) => ({
        posts: [...(data.posts || []), ...(newData.posts || [])],
    });

    const {
        data = { posts: [] },
        loading,
        hasMore
    } = useInfiniteScroll(postEndpoint, 10, { posts: [] }, dataHandler);

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

    // Fonction pour mettre à jour le crédit de l'utilisateur après un achat
    const handleCreditUpdate = (newCredit) => {
        setUser((prevUser) => ({
            ...prevUser,
            credit: newCredit, // Mise à jour du crédit
        }));
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (userLoading) return <p>Chargement...</p>;

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
                                <FaUserFriends className="icon" /> <strong>{user.followers}</strong> Abonnés
                                <div className="followers-container">
                                    <Followers userId={user?.id} />
                                </div>
                            </button>
                            <button className="stat-button">
                                <FaUserCheck className="icon" /> <strong>{user.following}</strong> Abonnements
                                <div className="followings-container">
                                    <Followings />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* CreditCard affiche le crédit actuel */}
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

            <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="Posts" />
                <Tab label="Articles" />
                <Tab label="Commandes" />
                <Tab label="Favorites" />
            </Tabs>

            {activeTab === 0 && (
                <div className="posts-container">
                    {data?.posts?.length > 0 ? (
                        data.posts.map(post => (
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
                                views={post.viewers || 0}
                                idUser={post.idUser}
                            />
                        ))
                    ) : (
                        <p>Aucun post disponible.</p>
                    )}
                    {loading && <div>Loading more posts...</div>}
                    {hasMore && <DotTyping />}
                    {!hasMore && data?.posts?.length > 0 && <div>Vous avez tout vu !</div>}
                </div>
            )}

            {activeTab === 1 && <Articles />}
            {activeTab === 2 && <Commandes />}
            {activeTab === 3 && <Favorites />}

            {/* RechargeCreditModal - passez handleCreditUpdate */}
            <RechargeCreditModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                userId={user?.id}
                onCreditUpdate={handleCreditUpdate} // Mettre à jour le crédit après achat
            />

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
