import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserPlus, FaFileAlt, FaCreditCard, FaUserFriends, FaUserCheck } from 'react-icons/fa';
import { Tabs, Tab } from '@mui/material';
import useFetch from '../backend/Services/useFetch';
import useInfiniteScroll from '../backend/Services/useInfiniteScroll';
import RechargeCreditModal from './modals/RechargeCreditModal';
import CreditCard from './CreditCard';
import CustomAlert from './Alert/CustomAlert';
import PostItem from './PostItem';
import Articles from './Articles';
import Commandes from './Commandes';
import CommandesVendeurs from './CommandesVendeur';
import Followers from './Followers';
import Followings from './Following';
import { DotTyping } from './DotTyping';
import Favorites from './Favorites';
import '../css/userProfile.css';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { idUser } = useParams();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const { user: user_connect } = useAuth();

    // Profil utilisateur
    const profileUrl = idUser ? `users/profile/${idUser}` : "users/profile";
    const { data: userData, loading: userLoading, error: userError } = useFetch(profileUrl);

    // Posts de l'utilisateur
    const postEndpoint = userData?.user?.id ? `posts/postall-user?userId=${userData.user.id}` : `posts/postall-user?userId=${idUser}`;
    const dataHandler = (newData) => ({
        posts: [...(data.posts || []), ...(newData.posts || [])],
    });

    const { data = { posts: [] }, loading, hasMore } = useInfiniteScroll(postEndpoint, 10, { posts: [] }, dataHandler);

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

    const handleCreditUpdate = (newCredit) => {
        setUser((prevUser) => ({
            ...prevUser,
            credit: newCredit,
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

                {!idUser && <Tab label="Commandes Effectuées" />}
                {!idUser && <Tab label="Favorites" />}
                {!idUser && user_connect?.type==='vendeur' && <Tab label="Commandes" />}
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

            {/* Condition pour afficher CommandesVendeurs si l'utilisateur est vendeur */}
            {user_connect?.type === 'vendeur' && activeTab === 4 && <CommandesVendeurs />}

            <RechargeCreditModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                userId={user?.id}
                onCreditUpdate={handleCreditUpdate}
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
