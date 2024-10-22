import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import useFetch from "../backend/Services/useFetch.js";
import useSave from "../backend/Services/useSave.js";
const ChatMessage = ({ isOutgoing, avatar, name, time, message, image, relatedEntity, from }) => {
    const renderRelatedEntity = () => {
        if (!relatedEntity) return null;

        switch (from) {
            case 'post':
                return (
                    <div className="card w-50 shadow-sm mb-0 mt-1">
                        <div className="card-body d-flex p-2 bg-lightblue theme-dark-bg rounded">
                            <i className="feather-image text-blue-gradient me-2 font-md mt-1"></i>
                            <div className="w-100">
                                <div className="card-image w-100 p-0 mb-2">
                                    {relatedEntity.contenuMedia && relatedEntity.contenuMedia.length > 0 ? (
                                        <img
                                            src={relatedEntity.contenuMedia[0].url}
                                            className="w-100 rounded-3"
                                            alt="Post attachment"
                                        />
                                    ) : (
                                        <p className="font-xssss text-grey-800">{relatedEntity.contenu}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'comment':
                return (
                    <div className="card w-100 shadow-sm mb-0 mt-2">
                        <div className="card-body d-flex p-2 bg-lightblue theme-dark-bg rounded">
                            <i className="feather-message-circle text-blue-gradient me-2 font-md mt-1"></i>
                            <div className="w-100">
                                <h6 className="mb-1 font-xssss text-grey-900">Related Comment</h6>
                                <p className="font-xssss fw-400 text-grey-500 lh-20">
                                    {relatedEntity.contenu}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`message-item ${isOutgoing ? 'outgoing-message' : ''}`}>
            <div className="message-user d-flex align-items-center mb-2">
                <figure className="avatar me-2">
                    <img src={avatar} alt="User avatar" className="shadow-sm rounded-circle" style={{ width: '30px', height: '30px' }} />
                </figure>
                <div>
                    <h6 className="font-xssss mt-1 mb-0">{name}</h6>
                    <div className="time text-grey-500" style={{ fontSize: '10px' }}>
                        {time}
                        {isOutgoing && <i className="ti-double-check text-info ms-1"></i>}
                    </div>
                </div>
            </div>

            <div className={`message-wrap ${isOutgoing ? 'bg-blue-gradiant' : 'bg-greyblue'} p-2 rounded`}>
                <p className={`mb-0 font-xssss lh-20 ${isOutgoing ? 'text-white' : 'text-black'} `}>
                    {message}
                </p>
            </div>

            {renderRelatedEntity()}

            {image && !from && (
                <div className="card-image w-100 p-0 mt-2">
                    <img
                        src={image}
                        className="w-25 rounded-3 float-right"
                        alt="Message attachment"
                    />
                </div>
            )}
        </div>
    );
};



const ChatForm = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const { saveData, isSaving, saveError } = useSave();
    const { id } = useAuth();

    const handleMessage = useCallback(async (e) => {
        e.preventDefault();
        if (message.trim()) {
            try {
                const response = await saveData('users/messages', { content: message, receiver: id });
                onSendMessage(response.data);
                setMessage('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    }, [message, saveData, onSendMessage]);

    return (
        <div className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg" style={{ width: '98%' }}>
            <form className="chat-form" onSubmit={handleMessage}>
                <button type="button" className="bg-grey float-left">
                    <i className="ti-microphone text-grey-600"></i>
                </button>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Start typing.."
                        className="z-index-1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSaving}
                    />
                </div>
                <button type="submit" className="bg-blue-gradiant" disabled={isSaving}>
                    <i className="ti-arrow-right text-white"></i>
                </button>
            </form>
            {saveError && <p className="error-message">Error: {saveError}</p>}
        </div>
    );
};

const Chat = () => {
    const { id, user } = useAuth();
    const [messages, setMessages] = useState([]);
    const { data, isLoading } = useFetch(`users/discussion/${id}`);

    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    const handleSendMessage = useCallback((newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
    }, []);

    const memoizedMessages = useMemo(() => messages.map((msg, index) => (
       <>
           {

           }
           <ChatMessage
               key={msg.id || index}
               isOutgoing={msg.senderId === user.id}
               avatar={msg.sender.image}
               name={`${msg.sender.prenom} ${msg.sender.nom}`}
               time={new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               message={msg.content}
               image={null}
               relatedEntity={msg.relatedEntity}
               from={msg.from}
               fromId={msg.fromId}
               // Passer le type de message (post, commentaire, etc.)
           />
       </>
    )), [messages, user.id]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-content right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0 ps-lg-3 ms-0 me-0" style={{ maxWidth: '100%' }}>
                    <div className="row">
                        <div className="col-lg-12 position-relative">
                            <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                <div className="chat-body p-3">
                                    <div className="messages-content pb-5">
                                        {memoizedMessages}
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                            <ChatForm onSendMessage={handleSendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
