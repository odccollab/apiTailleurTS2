import React, { useEffect, useState } from 'react';
import useFetch from '../backend/Services/useFetch'; // Assuming you have this hook

const Favorites = () => {
    const { data: favorites, loading, error } = useFetch('favorites/user'); // Replace with actual endpoint

    if (loading) return <p>Loading favorites...</p>;
    if (error) return <p>Error fetching favorites.</p>;

    return (
        <div className="favorites-container">
            {favorites.length > 0 ? (
                favorites.map((favorite) => (
                    <div key={favorite.id} className="favorite-item">
                        <h3>{favorite.name}</h3>
                        <p>{favorite.description}</p>
                    </div>
                ))
            ) : (
                <p>No favorites available.</p>
            )}
        </div>
    );
};

export default Favorites;
