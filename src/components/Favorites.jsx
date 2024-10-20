import React, { useEffect, useState } from 'react';
import useFetch from '../backend/Services/useFetch'; // Assurez-vous que ce hook est bien configuré
import useInfiniteScroll from '../backend/Services/useInfiniteScroll'; // Import du hook d'infinite scroll
import PostItem from './PostItem'; // Assurez-vous que le chemin d'importation est correct
import '../css/favorites.css'; // Ajouter votre fichier CSS si nécessaire

const Favorites = () => {
    // Utilisation d'un tableau d'état pour stocker les favoris
    const [favorites, setFavorites] = useState([]); 

    // Endpoint pour récupérer les favoris
    const favoriteEndpoint = 'users/favorite'; 

    // Configuration du hook d'infinite scroll
    const {
        data = { favorites: [] },
        loading: infiniteLoading,
        hasMore
    } = useInfiniteScroll(favoriteEndpoint, 10, { favorites: [] }, (newData) => ({
        favorites: [...favorites, ...(newData.favorites || [])],
    }));

    // Mise à jour de l'état des favoris en fonction des données récupérées
    useEffect(() => {
        if (data.favorites) {
            setFavorites(prev => [...prev, ...data.favorites]); // Combine les anciens et les nouveaux favoris
        }
    }, [data]);

    // Gestion de l'affichage de l'état de chargement et des favoris
    if (infiniteLoading) return <p>Loading favorites...</p>;
    if (!favorites.length) return <p className='not-favorites'>Pas de favoris disponibles.</p>;

    return (
        <div className="favorites-container">
            {favorites.map(post => (
                <PostItem
                    key={post.id}
                    userImage={post.user?.image || '/images/default-user.jpg'}
                    userName={`${post.user?.prenom || 'Utilisateur'} ${post.user?.nom || ''}`}
                    timeAgo={new Date(post.createdAt).toLocaleString()}
                    content={post.contenu || 'Pas de contenu'}
                    media={post.contenuMedia || ''}
                    likes={post.likes || "0"}
                    comments={post.comments || "0"}
                    id={post.id}
                    views={post.viewers || 0}
                    idUser={post.idUser}
                />
            ))}
            {infiniteLoading && <div>Loading more favorites...</div>}
            {!hasMore && favorites.length > 0 && <div>Vous avez tout vu !</div>}
        </div>
    );
};

export default Favorites;
