import React, { useState, useEffect } from 'react';
import useFetch from "../backend/Services/useFetch";
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { styled } from '@mui/material/styles';
import apiRepository from "../backend/Repository/apiAxiosRepository.js";

const Likes = (props) => {
    const { id } = props;
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const { data: likesData, loading, error } = useFetch(`posts/like/${id}`);

    useEffect(() => {
        if (likesData) {
            const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
            const dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts')) || [];
            setIsLiked(likedPosts.includes(id));
            setIsDisliked(dislikedPosts.includes(id));
        }
    }, [likesData, id]);

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        const dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts')) || [];
        setIsLiked(likedPosts.includes(id));
        setIsDisliked(dislikedPosts.includes(id));
    }, [id]);

    const handleLikeClick = async (postId) => {
        if (isLiked) {
            setIsLiked(false);
            setIsDisliked(false);

            let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
            likedPosts = likedPosts.filter(id => id !== postId);
            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        } else {
            setIsLiked(true);
            setIsDisliked(false);

            let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
            let dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts')) || [];
            likedPosts.push(postId);
            dislikedPosts = dislikedPosts.filter(id => id !== postId);
            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
            localStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts));
        }
    };

    const handleDislikeClick = async (postId) => {
        if (isDisliked) {
            setIsLiked(false);
            setIsDisliked(false);

            let dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts')) || [];
            dislikedPosts = dislikedPosts.filter(id => id !== postId);
            localStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts));
        } else {
            setIsLiked(false);
            setIsDisliked(true);

            let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
            let dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts')) || [];
            dislikedPosts.push(postId);
            likedPosts = likedPosts.filter(id => id !== postId);
            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
            localStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts));
        }
    };

    const StyledThumbUpIcon = styled(ThumbUpIcon)({
        color: isLiked ? 'blue' : 'grey',
        transition: 'color 0.3s',
    });

    const StyledThumbDownIcon = styled(ThumbDownIcon)({
        color: isDisliked ? 'red' : 'grey',
        transition: 'color 0.3s',
    });

    return (
        <>
            <IconButton onClick={() => handleLikeClick(id)}>
                <StyledThumbUpIcon />
            </IconButton>
            <IconButton onClick={() => handleDislikeClick(id)}>
                <StyledThumbDownIcon />
            </IconButton>
            <div>{error}</div>
        </>
    );
};

export default Likes;