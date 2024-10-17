import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import useFetch from "../backend/Services/useFetch.js";
import useSave from "../backend/Services/useSave.js";

const ChatMessage = React.memo(({ isOutgoing, avatar, name, time, message, image }) => (
    <div className={`message-item ${isOutgoing ? 'outgoing-message' : ''}`}>
        <div className="message-user">
            <figure className="avatar">
                <img src={avatar} alt="User avatar" />
            </figure>
            <div>
                <h5>{name}</h5>
                <div className="time">
                    {time} {isOutgoing && <i className="ti-double-check text-info "></i>}
                </div>
            </div>
        </div>
        {message && <div className={`message-wrap ${isOutgoing ? 'bg-blue-gradiant' : 'bg-greyblue'}`}>{message}</div>}
        {image && <figure><img src={image} className="w-25 img-fluid rounded-3 " alt="Message attachment" /></figure>}
    </div>
));

const ChatForm = React.memo(({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const { saveData, isSaving, saveError } = useSave();
    const { id } = useAuth();
    const handleMessage = useCallback(async (e) => {
        e.preventDefault();
        if (message.trim()) {
            try {
                const response = await saveData('users/messages', { content: message,receiver:id });
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
});

const Chat = () => {
    const { id, user } = useAuth();
    const { data, isLoading } = useFetch(`users/discussion/${id}`);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    const handleSendMessage = useCallback((newMessage) => {
        setMessages(prevMessages => [...prevMessages,newMessage]);
    }, []);

    const memoizedMessages = useMemo(() => messages.map((msg, index) => (
        <ChatMessage
            key={msg.id || index}
            isOutgoing={msg.senderId === user.id}
            avatar={msg.sender.image}
            name={`${msg.sender.prenom} ${msg.sender.nom}`}
            time={new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            message={msg.content}
            image={msg.relatedEntity ? msg.relatedEntity.image : null}
        />
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