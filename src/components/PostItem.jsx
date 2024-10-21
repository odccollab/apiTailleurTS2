import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuivreProvider } from "../context/SuivreContext";
import { ThumbsUp, MessageCircle } from 'lucide-react';
import FollowButton from './FollowButton';
import MediaCarousel from './MediaCarousel';
import CommentSection from "./CommentSection";
import OptionsModal from './modals/OptionsModals';
import Favoris from "./Favoris";
import Vue from "./Vue";
import Likes from "./Likes";
import "../css/postItem.css";
import "../css/comment.css";

const PostItem = ({ 
  userImage, 
  userName, 
  timeAgo, 
  content, 
  likeStatus, 
  comments, 
  media, 
  id, 
  views, 
  idUser, 
  favorite 
}) => {
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showLikes, setShowLikes] = useState(false);

    const navigate = useNavigate();

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

    const handleUserProfileClick = () => {
        navigate(`/profile/${idUser}`);
    };

    return (
        <div className="post-item-container shadow-sm rounded-lg border bg-white mb-4" style={{ maxWidth: '800px' }}>
            <div className="post-header d-flex align-items-center p-3">
                <img
                    src={userImage}
                    alt="User"
                    className="rounded-circle user-image"
                    onClick={handleUserProfileClick}
                    style={{ cursor: 'pointer' }}
                />
                <div className="ms-3">
                    <h6
                        className="mb-0 text-dark font-weight-bold"
                        onClick={handleUserProfileClick}
                        style={{ cursor: 'pointer' }}
                    >
                        {userName}
                    </h6>
                    <span className="text-muted font-small">{timeAgo}</span>
                </div>
                <div className="ms-auto flex">
                    <SuivreProvider>
                        <FollowButton followedId={idUser} />
                    </SuivreProvider>
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
                <Likes id={id} likeStatus={likeStatus} />
                <button className="comment-toggle-btn filled" onClick={handleCommentToggle}>
                    <MessageCircle />
                </button>
                <Vue postId={id} initialViews={views} />
                <Favoris id={id} favorite={favorite} />
            </div>

            {showComments && <CommentSection postId={id} />}
            <OptionsModal show={showOptionsModal} handleClose={handleOptionsModal} postId={id} />
        </div>
    );
};

export default PostItem;