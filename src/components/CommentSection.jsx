import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import useFetch from '../backend/Services/useFetch';
import useSave from '../backend/Services/useSave';
import '../css/comment.css';
import Swal from 'sweetalert2';

const PostCommentaire = ({ postId }) => {
    const [showAllComments, setShowAllComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const { data, loading} = useFetch(`posts/${postId}/comment`);
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
        try {
            // Afficher la confirmation SweetAlert
            const result = await Swal.fire({
                title: 'Êtes-vous sûr ?',
                text: "Vous ne pourrez pas revenir en arrière !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer !',
                cancelButtonText: 'Annuler',
                reverseButtons: true
            });
    
            // Si l'utilisateur confirme
            if (result.isConfirmed) {
                // Tentative de suppression
                await saveData(`posts/${postId}/comment/${commentId}`, { postId }, 'DELETE');
                
                // Mise à jour de l'état local
                const updatedComments = comments.filter(comment => comment.id !== commentId);
                setComments(updatedComments);
    
                // Message de succès
                await Swal.fire({
                    title: 'Supprimé !',
                    text: 'Le commentaire a été supprimé.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
            
            // Message d'erreur
            await Swal.fire({
                title: 'Erreur !',
                text: "Une erreur s'est produite lors de la suppression.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
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
                                    <button onClick={() => handleEditComment(comment.id, comment.content)} className="comment-action-icon"  title="modifier le commentaire">
                                        
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="comment-action-icon delete"
                                        title="Supprimer le commentaire"
                                    >
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
