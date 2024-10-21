import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import useFetch from "../backend/Services/useFetch.js";
import { useAuth } from "../context/AuthContext.jsx";

const MessagesSection = () => {
    const [messages, setMessages] = useState([]);
    const { data, loading, error } = useFetch("users/messages");

    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur: {error}</div>;

    return (
        <div className="message-container">
            <div className="section feed-body">
                <h4 className="font-xsssss">Messages</h4>
                <ul className="list-group list-group-flush">
                    {messages.map((message, index) => (
                        <MessageItem key={index} message={message} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

const MessageItem = ({ message }) => {
    const { user, lastMessage } = message;
    const { setId } = useAuth();
    const timeAgo = formatDistanceToNow(new Date(lastMessage.createdAt), {
        addSuffix: true,
        locale: fr
    });

    return (
        <li 
            className="list-group-item d-flex align-items-center" 
            onClick={() => setId(user.id)}
        >
            <figure className="avatar">
                <img src={user.image} alt={`${user.prenom} ${user.nom}`} />
                {user.isOnline && <span className="online-status" />}
            </figure>
            <div className="flex-grow-1">
                <h3 className="text-dark">
                    {user.prenom} {user.nom}
                </h3>
                <p className="text-grey-500">{lastMessage.content}</p>
            </div>
            <span className="ms-auto">{timeAgo}</span>
        </li>
    );
};

export default MessagesSection;