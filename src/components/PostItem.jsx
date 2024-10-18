import React, { useState } from 'react';
import Favoris from "./Favoris.jsx";
import OptionsModal from './modals/OptionsModals.jsx';
import MediaCarousel from './MediaCarousel.jsx';
import "../css/postItem.css";
import CommentSection from "./CommentSection.jsx";
import { ThumbsUp, MessageCircle } from 'lucide-react';
import ConfirmationModal from "./ConfirmationModal.jsx";
import Vue from "./Vue.jsx";
import Follow from "./Follow.jsx";
import {FollowProvider} from "../context/FollowContext.jsx";
import Followings from "./Following.jsx";
import Followers from "./Followers.jsx";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Likes from "./Likes.jsx";
const PostItem = ({ userImage, userName, timeAgo, content, likes, comments, media, id ,views,idUser}) => {
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showLikes, setShowLikes] = useState(false);
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
    return (
        <div className="post-item-container shadow-sm rounded-lg border bg-white mb-4" style={{maxWidth: '800px'}}>
            <div className="post-header d-flex align-items-center p-3">
                <img src={userImage} alt="User" className="rounded-circle user-image"/>
                <div className="ms-3">
                    <h6 className="mb-0 text-dark font-weight-bold">{userName}</h6>
                    <span className="text-muted font-small">{timeAgo}</span>
                </div>
                <div className="ms-auto flex">
                    <FollowProvider>
                        <Follow followedId={idUser}/>
                    </FollowProvider>
                    {/* // le button contact */}
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
                <div className="post-media " style={{maxWidth: '900px', height: '600px'}}>
                    <MediaCarousel media={media}/>
                </div>
            )}

            <div className="post-footer d-flex align-items-center justify-content-between p-3">
                {!showLikes && (
                    <div>
                        <IconButton onClick={handleLikeClick}>
                            <ThumbUpIcon />
                        </IconButton>
                        <IconButton onClick={handleDislikeClick}>
                            <ThumbDownIcon />
                        </IconButton>
                    </div>
                )}
                {showLikes && <Likes id={id} />}
                <button onClick={handleCommentToggle}><MessageCircle/> {comments} Comments</button>
                 <Vue postId={id} initialViews={views}/>
                <Favoris id={id}/>
            </div>
           
            {showComments && <CommentSection postId={id}/>}
            <OptionsModal show={showOptionsModal} handleClose={handleOptionsModal} postId={id}/>

        </div>
    );
};

export default PostItem;
