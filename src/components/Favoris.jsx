import React, { useState, useEffect } from 'react';
import useSave from "../backend/Services/useSave";
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';

const Favoris = ({favorite,id}) => {
    const { saveData, isSaving, saveError } = useSave();
    const [isFavorite, setIsFavorite] = useState(favorite); // Initialize from
    useEffect(() => {
        setIsFavorite(favorite); // Sync with if it changes
    }, [favorite]);

    const fav = async (postId) => {
        await saveData("users/favorite", {"postId": postId});
    }

    const handleClick = async (postId) => {
        setIsFavorite(!isFavorite);
        await fav(postId);
    }

    const StyledStarIcon = styled(StarIcon)({
        color: isFavorite ? 'orange' : 'whitegrey', // Change color based on favorite state
        transition: 'color 0.3s', // Smooth color transition
    });

    return (
        <>
            <IconButton onClick={() => handleClick(id)} disabled={isSaving}>
                <StyledStarIcon />
            </IconButton>
            {saveError && <div>{saveError}</div>}
        </>
    );
}

export default Favoris;
