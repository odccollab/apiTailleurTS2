import React, { useState, useEffect } from 'react';
import useSave from "../backend/Services/useSave";
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';

const Favoris = (props) => {
    const { saveData, isSaving, saveError } = useSave();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Vérifier si le post est déjà un favori dans le local storage
        const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];
        setIsFavorite(favoritePosts.includes(props.id));
    }, [props.id]);

    const fav = async (postId) => {
        const post = await saveData("users/favorite", {"postId": postId});
    }

    const handleClick = async (postId) => {
        setIsFavorite(!isFavorite);
        await fav(postId);

        // Mettre à jour le local storage
        let favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];
        if (isFavorite) {
            favoritePosts = favoritePosts.filter(id => id !== postId);
        } else {
            favoritePosts.push(postId);
        }
        localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
    }

    const StyledStarIcon = styled(StarIcon)({
        color: isFavorite ? 'orange' : 'whitegrey', // Couleur par défaut transparente
        transition: 'color 0.3s', // Animation de transition
    });

    return (
        <>
            <IconButton onClick={() => handleClick(props.id)}>
                <StyledStarIcon />
            </IconButton>
            <div>{saveError}</div>
        </>
    );
}

export default Favoris;