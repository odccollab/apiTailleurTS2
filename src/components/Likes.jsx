import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { styled } from '@mui/material/styles';
import useSave from "../backend/Services/useSave";  // assuming you're using this hook for the API call

const Likes = ({ id, likeStatus }) => {
    const [isLiked, setIsLiked] = useState(likeStatus=='like');
    const [isDisliked, setIsDisliked] = useState(likeStatus=='like');
    const { saveData } = useSave(); // Hook to handle API call

    useEffect(() => {
        if (likeStatus === "like") {
            setIsLiked(true);
            setIsDisliked(false);
        } else if (likeStatus === "dislike") {
            setIsLiked(false);
            setIsDisliked(true);
        } else {
            setIsLiked(false);
            setIsDisliked(false);
        }
    }, [likeStatus]);

    const handleLikeClick = async () => {
        try {
            console.log("Before clicking like", isLiked); // Debugging
            if (isLiked) {
                // Neutral state if already liked
                setIsLiked(false);
                await saveData(`posts/neutre/${id}`, {});
            } else {
                setIsLiked(true);
                setIsDisliked(false);
                await saveData(`posts/like/${id}`, {});
            }
            console.log("After clicking like", isLiked); // Debugging
        } catch (err) {
            console.error("Error toggling like", err);
        }
    };

    const handleDislikeClick = async () => {
        try {
            console.log("Before clicking dislike", isDisliked); // Debugging
            if (isDisliked) {
                // Neutral state if already disliked
                setIsDisliked(false);
                await saveData(`posts/neutre/${id}`, {});
            } else {
                setIsLiked(false);
                setIsDisliked(true);
                await saveData(`posts/dislike/${id}`, {});
            }
            console.log("After clicking dislike", isDisliked); // Debugging
        } catch (err) {
            console.error("Error toggling dislike", err);
        }
    };

    const StyledThumbUpIcon = styled(ThumbUpIcon)({
        color: isLiked ? 'blue' : 'grey',
        transition: 'color 2s',
    });

    const StyledThumbDownIcon = styled(ThumbDownIcon)({
        color: isDisliked ? 'red' : 'grey',
        transition: 'color 2s',
    });

    return (
        <div style={{ display: 'flex', gap: '10px' }}> {/* Added gap for better control */}
            <IconButton onClick={handleLikeClick}>
                <StyledThumbUpIcon />
            </IconButton>
            <IconButton onClick={handleDislikeClick}>
                <StyledThumbDownIcon />
            </IconButton>
        </div>
    );
};

export default Likes;
