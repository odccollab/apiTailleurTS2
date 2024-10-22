import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous que React Router est installé et configuré
import Favoris from "./Favoris.jsx";
import OptionsModal from './modals/OptionsModals.jsx';
import MediaCarousel from './MediaCarousel.jsx';
import "../css/postItem.css";
import CommentSection from "./CommentSection.jsx";
import { ThumbsUp, MessageCircle } from 'lucide-react';
import ConfirmationModal from "./ConfirmationModal.jsx";
import Vue from "./Vue.jsx";
import Follow from "./Follow.jsx";
import { FollowProvider } from "../context/FollowContext.jsx";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Likes from "./Likes.jsx";
import "../css/comment.css";

const PostItem = ({delet,post, userImage, userName, timeAgo, content, likeStatus, comments, media, id, views, idUser, favorite ,isfollowing}) => {

    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showLikes, setShowLikes] = useState(false);

    const navigate = useNavigate(); // Hook pour la navigation

    const handleCommentToggle = () => {
        setShowComments(!showComments);
    };
    const handleLikeClick = () => {
        setShowLikes(true);
    };
    const handleDislikeClick = () => {
        setShowLikes(true);
    };
    const handleOptionsModal = () => setShowOptionsModal(!showOptionsModal);

    // Fonction pour rediriger vers le profil de l'utilisateur
    const handleUserProfileClick = () => {
        navigate(`/profile/${idUser}`); // Redirige vers le profil avec l'ID de l'utilisateur
    };

    return (
        <div className="post-item-container shadow-sm rounded-lg border bg-white mb-4" style={{ maxWidth: '800px' }}>
            <div className="post-header d-flex align-items-center p-3">
                <img
                    src={userImage}
                    alt="User"
                    className="rounded-circle user-image"
                    onClick={handleUserProfileClick} // Redirection lors du clic sur la photo
                    style={{ cursor: 'pointer' }} // Curseur pour indiquer la cliquabilité
                />
                <div className="ms-3">
                    <h6
                        className="mb-0 text-dark font-weight-bold"
                        onClick={handleUserProfileClick} // Redirection lors du clic sur le nom
                        style={{ cursor: 'pointer' }} // Curseur pour indiquer la cliquabilité
                    >
                        {userName}
                    </h6>
                    <span className="text-muted font-small">{timeAgo}</span>
                </div>
                <div className="ms-auto flex">
                    <FollowProvider>
                        {isfollowing&&<Follow followedId={idUser}/>}
                    </FollowProvider>
                </div>
                <button className="btn-icon ms-auto" onClick={handleOptionsModal}>
                    <i className="ti-more-alt text-dark"></i>
                </button>
            </div>

            <div className="post-content px-3 pb-3">
                <p className="text-muted mb-0">
                    {content} <a href="#" className="text-primary">See more</a>
                </p>
            </div>

            {media && media.length > 0 && (
                <div className="post-media" style={{ maxWidth: '900px', height: '600px' }}>
                    <MediaCarousel media={media} />
                </div>
            )}

            <div className="post-footer d-flex align-items-center justify-content-between p-3">

                {<Likes id={id} likeStatus={likeStatus} />}
                <button className="comment-toggle-btn " onClick={handleCommentToggle}>
                    <MessageCircle  color="#262626" />
                </button>
                <Vue postId={id}  initialViews= {views} />
                <Favoris id={id} favorite={favorite} />
            </div>


            {showComments && <CommentSection postId={id} />}
            <OptionsModal delet={delet} post={post} show={showOptionsModal} handleClose={handleOptionsModal} postId={id} />
        </div>
    );
};

export default PostItem;
