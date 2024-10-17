import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../backend/Services/useFetch';
import '../css/notifications.css';  // Import du fichier CSS pour le style

const Notifications = () => {
    // Récupération des notifications via useFetch
    const { data: notification, loading, error } = useFetch('users/notification');
    const [notifications, setNotifications] = useState([]);
    const [visibleNotifications, setVisibleNotifications] = useState(1);
    const [hoveredNotificationId, setHoveredNotificationId] = useState(null); // Gère l'affichage du menu d'action

    // Utilisez useEffect pour mettre à jour les notifications après avoir récupéré les données
    useEffect(() => {
        if (notification && notification.notifications) {
            setNotifications(notification.notifications);
        }
    }, [notification]);

    if (loading) return <p>Chargement des notifications...</p>;
    if (error) return <p>Erreur lors du chargement des notifications.</p>;

    // Fonction pour marquer toutes les notifications comme lues
    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
        console.log("Toutes les notifications sont marquées comme lues.");
    };

    // Fonction pour marquer une notification comme lue
    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, isRead: true } : notif
        ));
    };

    // Fonction pour charger plus de notifications
    const loadMoreNotifications = () => {
        setVisibleNotifications(prev => Math.min(prev + 1, notifications.length));
    };

    // Fonction pour réduire le nombre de notifications affichées
    const showFewerNotifications = () => {
        setVisibleNotifications(prev => Math.max(prev - 1, 1));
    };

    // Fonction pour supprimer une notification
    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
        console.log(`Notification ${id} supprimée`);
    };

    return (
        <div className="notifications-container">
            {/* En-tête */}
            <div className="notifications-header">
                <div className="header-top">
                    <h1 className="header-title">Notifications</h1>
                    <button className="mark-read-btn" onClick={markAllAsRead}>Tout marquer comme lu</button>
                </div>

                {/* Filtres */}
                <div className="filters">
                    <button className="filter-btn active">Tout</button>
                    <button className="filter-btn">Mentions</button>
                    <button className="filter-btn">J'aime</button>
                    <button className="filter-btn">Abonnements</button>
                </div>
            </div>

            {/* Liste des notifications */}
            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications.slice(0, visibleNotifications).map((notif) => (
                        <div
                            key={notif.id}
                            className={`notification-item ${notif.isRead ? 'read' : 'unread'}`} // Classe dynamique pour l'état lu/non lu
                            onMouseEnter={() => setHoveredNotificationId(notif.id)}
                            onMouseLeave={() => setHoveredNotificationId(null)}
                            onClick={() => markAsRead(notif.id)} // Marquer comme lu au clic
                        >
                            <img src={notif.avatar || '/default-avatar.jpg'} alt="" className="avatar" />

                            <div className="notification-content">
                                <p className="notification-text">
                                    <strong>{notif.username || 'Utilisateur inconnu'}</strong> {notif.content}
                                </p>
                                <div className="notification-meta">
                  <span className="notification-time">
                    {format(new Date(notif.createdAt), 'dd/MM/yyyy HH:mm')}
                  </span>
                                    {notif.isNew && !notif.isRead && <div className="notification-new"></div>} {/* Badge si non lu */}
                                </div>
                            </div>

                            {/* Icône et menu d'actions */}
                            <div className="notification-actions">
                                <button className="action-btn">
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </button>
                                {/* Affichage de l'option "Supprimer" au survol */}
                                {hoveredNotificationId === notif.id && (
                                    <div className="action-menu">
                                        <button onClick={() => deleteNotification(notif.id)}>Supprimer</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Aucune notification.</p>
                )}
            </div>

            {/* Boutons "Voir plus" et "Voir moins" */}
            <div className="load-more">
                {visibleNotifications < notifications.length && (
                    <button className="load-more-btn" onClick={loadMoreNotifications}>
                        Voir plus de notifications
                    </button>
                )}
                {visibleNotifications > 1 && (
                    <button className="load-more-btn" onClick={showFewerNotifications}>
                        Voir moins de notifications
                    </button>
                )}
            </div>
        </div>
    );
};

export default Notifications;