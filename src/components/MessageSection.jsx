import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import useFetch from "../backend/Services/useFetch.js";
import {useAuth} from "../context/AuthContext.jsx";

const MessagesSection = () => {
    // State for storing messages
    const [messages, setMessages] = useState([]);
    const { data, loading, error } = useFetch("users/messages");

    // Update messages when data is fetched
    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>Error loading messages: {error}</p>;

    return (
        <div className="section full pe-3 ps-4 pt-4 position-relative feed-body">
            <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">MESSAGES</h4>
            <ul className="list-group list-group-flush">
                {messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                ))}
            </ul>
        </div>
    );
};

const MessageItem = ({ message }) => {
    const { user, lastMessage } = message;
    const {setId} = useAuth()
    const timeAgo = formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true, locale: fr });

    return (
        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center" onClick={()=>setId(user.id)}>
            <figure className="avatar float-left mb-0 me-2">
                <img src={user.image} alt={`${user.prenom} ${user.nom}`} className="w35" />
            </figure>
            <div className="flex-grow-1">
                <h3 className="fw-700 mb-0 mt-0">
                    <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">
                        {`${user.prenom} ${user.nom}`}
                    </a>
                </h3>
                <p className="font-xssss text-grey-500 mb-0">{lastMessage.content}</p>
            </div>
            <span className="font-xssss text-grey-500 ms-auto">{timeAgo}</span>
        </li>
    );
};

export default MessagesSection;
