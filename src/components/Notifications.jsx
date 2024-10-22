import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import useFetch from '../backend/Services/useFetch';
import '../css/notifications.css';
import extractUrlImg from '../js/extractUrlImg';

const Notifications = () => {
    const navigate = useNavigate(); 
    const { data: notification, loading, error } = useFetch('users/notification');
    const [notifications, setNotifications] = useState([]);
    const [visibleNotifications, setVisibleNotifications] = useState(2);
    const [hoveredNotificationId, setHoveredNotificationId] = useState(null);

    useEffect(() => {
        if (notification && notification.notifications) {
            setNotifications(notification.notifications);
        }
    }, [notification]);

    if (loading) return <p>Chargement des notifications...</p>;
    if (error) return <p>Erreur lors du chargement des notifications.</p>;

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, isRead: true } : notif
        ));
    };

    const handleNotificationClick = (notif) => {
        if (notif.type === 'post') {
            navigate(`/posts/${notif.idType}`);
        } else if (notif.type === 'user') {
            navigate(`/profile/${notif.idType}`); 
        }
        markAsRead(notif.id); // Marquer la notification comme lue
    };

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="header-top">
                    <h1 className="header-title">Notifications</h1>
                </div>
            </div>
            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications.slice(0, visibleNotifications).map((notif) => {
                        const cleanedText = notif.content.replace(extractUrlImg(notif.content), '').trim();
                        console.log(cleanedText);
                        return (
                            <div
                                key={notif.id}
                                className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
                                onMouseEnter={() => setHoveredNotificationId(notif.id)}
                                onMouseLeave={() => setHoveredNotificationId(null)}
                                onClick={() => handleNotificationClick(notif)} // Gérer le clic
                            >
                                <img src={extractUrlImg(notif.content)} alt="" className="avatar" />

                                <div className="notification-content">
                                    <p className="notification-text">
                                        <strong className="cursor-pointer">{cleanedText}</strong>
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
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-notifications-message">
                        <p className='not-notification'>Aucune notification !!!</p>
                    </div>
                )}
            </div>

            {notifications.length > 0 && (
                <div className="load-more">
                    {visibleNotifications < notifications.length && (
                        <button className="load-more-btn" onClick={() => setVisibleNotifications(notifications.length)}>
                            <FontAwesomeIcon icon={faChevronDown} /> Voir plus
                        </button>
                    )}
                    {visibleNotifications > 2 && (
                        <button className="load-more-btn" onClick={() => setVisibleNotifications(2)}>
                            <FontAwesomeIcon icon={faChevronUp} /> Voir moins
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
