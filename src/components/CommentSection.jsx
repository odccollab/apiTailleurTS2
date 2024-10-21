import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import useFetch from '../backend/Services/useFetch';
import useSave from '../backend/Services/useSave';
import '../css/comment.css';

const PostCommentaire = ({ postId }) => {
    const [showAllComments, setShowAllComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const { data, loading, error } = useFetch(`posts/${postId}/comment`);
    const { saveData, error: saveError } = useSave();

    useEffect(() => {
        if (data) setComments(data);
    }, [data]);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const newCommentData = await saveData(`posts/${postId}/comment`, { postId, text: newComment });
                setComments([newCommentData, ...comments]);
                setNewComment('');
            } catch (err) {
                console.error('Error saving comment:', err);
            }
        }
    };

    const handleEditComment = (commentId, currentText) => {
        const comment = comments.find(c => c.id === commentId);
        const timeSincePost = Date.now() - new Date(comment.timestamp).getTime();
        const fiveMinutesInMs = 5 * 60 * 1000;

        if (timeSincePost > fiveMinutesInMs) {
            alert("You can't edit this comment as it was posted more than 5 minutes ago.");
            return;
        }

        setEditingCommentId(commentId);
        setEditedCommentText(currentText);
    };

    const handleSaveEdit = async (commentId) => {
        try {
            await saveData(`posts/${postId}/comment/${commentId}`, { content: editedCommentText }, 'PUT');

            const updatedComments = comments.map(comment =>
                comment.id === commentId ? { ...comment, content: editedCommentText } : comment
            );
            setComments(updatedComments);
            setEditingCommentId(null);
            setEditedCommentText('');
        } catch (err) {
            console.error('Error editing comment:', err);
            alert("Unable to edit comment. Please try again later.");
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedCommentText('');
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await saveData(`posts/${postId}/comment/${commentId}`, { postId }, 'DELETE');
                const updatedComments = comments.filter(comment => comment.id !== commentId);
                setComments(updatedComments);
            } catch (err) {
                console.error('Error deleting comment:', err);
            }
        }
    };

    const visibleComments = showAllComments ? comments : (comments ? comments.slice(0, 2) : []);

    const toggleComments = () => setShowAllComments(!showAllComments);

    return (
        <div className="comments-section">
            <div className="comments-list">
                {loading && <p className="loading-message">Loading comments...</p>}
                {/* {error && <p className="error-message">Error: {error.message}</p>} */}
                {visibleComments.map(comment => (
                    <div key={comment.id} className="comment-item">
                        {/* <img src={comment.user.image} alt="Commenter" className="commenter-avatar */}
                        <div className="comment-content">
                            <div className="comment-header">
                                <p className="commenter-name">{comment.user.nom}</p>
                                <div className="comment-actions">
                                    <button onClick={() => handleEditComment(comment.id, comment.content)} className="comment-action-icon">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteComment(comment.id)} className="comment-action-icon">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            {editingCommentId === comment.id ? (
                                <div className="comment-edit-container">
                                    <textarea
                                        value={editedCommentText}
                                        onChange={(e) => setEditedCommentText(e.target.value)}
                                    />
                                    <div className="edit-buttons">
                                        <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="comment-text">{comment.content}</p>
                            )}
                        </div>
                    </div>
                ))}

                {Array.isArray(comments) && comments.length > 2 && (
                    <button className="toggle-comments-button" onClick={toggleComments}>
                        {showAllComments ? <><ChevronUp /> See less</> : <><ChevronDown /> See more</>}
                    </button>
                )}
            </div>

            <div className="new-comment">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={handleAddComment}>Comment</button>
                {saveError && <p className="error-message">Error saving comment: {saveError.message}</p>}
            </div>
        </div>
    );
};

PostCommentaire.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default PostCommentaire;
