import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; // Conserve uniquement les icônes nécessaires
import useFetch from '../backend/Services/useFetch';
import '../css/notifications.css';  // Import du fichier CSS pour le style

const Notifications = () => {
    const { data: notification, loading, error } = useFetch('users/notification');
    const [notifications, setNotifications] = useState([]);
    const [visibleNotifications, setVisibleNotifications] = useState(1);
    const [hoveredNotificationId, setHoveredNotificationId] = useState(null);

    useEffect(() => {
        if (notification && notification.notifications) {
            setNotifications(notification.notifications);
        }
    }, [notification]);

    if (loading) return <p>Chargement des notifications...</p>;
    if (error) return <p>Erreur lors du chargement des notifications.</p>;

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, isRead: true } : notif
        ));
    };

    const loadMoreNotifications = () => {
        setVisibleNotifications(prev => Math.min(prev + 1, notifications.length));
    };

    const showFewerNotifications = () => {
        setVisibleNotifications(prev => Math.max(prev - 1, 1));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="header-top">
                    <h1 className="header-title">Notifications</h1>
                    {/* <button className="mark-read-btn" onClick={markAllAsRead}>Tout marquer comme lu</button> */}
                </div>
            </div>

            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications.slice(0, visibleNotifications).map((notif) => (
                        <div
                            key={notif.id}
                            className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
                            onMouseEnter={() => setHoveredNotificationId(notif.id)}
                            onMouseLeave={() => setHoveredNotificationId(null)}
                            onClick={() => markAsRead(notif.id)}
                        >
                            <img src={notif.avatar || '/default-avatar.jpg'} alt="" className="avatar" />

                            <div className="notification-content">
                                <p className="notification-text">
                                    <strong>{notif.username || 'Sidy Diop'}</strong> {notif.content}
                                </p>
                                <div className="notification-meta">
                                    <span className="notification-time">
                                        {format(new Date(notif.createdAt), 'dd/MM/yyyy HH:mm')}
                                    </span>
                                    {notif.isNew && !notif.isRead && <div className="notification-new"></div>}
                                </div>
                            </div>

                            <div className="notification-actions">
                                <button className="action-btn">
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </button>
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

            <div className="load-more">
                {visibleNotifications < notifications.length && (
                    <button className="load-more-btn" onClick={loadMoreNotifications}>
                        <FontAwesomeIcon icon={faChevronDown} /> Voir plus
                    </button>
                )}
                {visibleNotifications > 1 && (
                    <button className="load-more-btn" onClick={showFewerNotifications}>
                        <FontAwesomeIcon icon={faChevronUp} /> Voir moins
                    </button>
                )}
            </div>
        </div>
    );
};

export default Notifications;
