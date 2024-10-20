import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from './PostItem';
import useFetch from '../backend/Services/useFetch';
import '../css/postDetail.css';
const PostDetail = () => {
    const { id } = useParams(); // Récupérer l'ID du post depuis l'URL
    const { data: post, loading, error } = useFetch(`posts/${id}`); // Récupérer les détails du post
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        if (post) {
            setPostData(post[0]); // Supposons que la réponse contient un objet post
        }
    }, [post]);
    console.log(postData);
    
    if (loading) return <p>Chargement du post...</p>;
    if (error) return <p>Erreur lors du chargement du post.</p>;

    return (
        <div className="post-detail-container">
            {postData ? (
                <>
                    <PostItem
                        key={postData.id}
                        userImage={`${postData.user?.image || '/images/default-user.jpg'}`}
                        userName={`${postData.user?.prenom || 'Utilisateur'} ${postData.user?.nom || ''}`}
                        timeAgo={new Date(postData.createdAt).toLocaleString()}
                        content={postData.contenu || 'Pas de contenu'}
                        media={postData.contenuMedia || ''} // Vérifier si c'est un tableau ou une chaîne
                        likes={postData.likes || "0"}
                        comments={postData.comments || "0"}
                        id={postData.id}
                        views={Array.isArray(postData.viewers) ? postData.viewers.length : postData.viewers || 0}
                        idUser={postData.user?.id}
                    />
                    {/* Afficher les médias si plusieurs */}
                    {/* {Array.isArray(postData.contenuMedia) && postData.contenuMedia.length > 0 && (
                        <div className="post-media-gallery">
                            {postData.contenuMedia.map((media, index) => (
                                <img
                                    key={index}
                                    src={media.url} // Assurez-vous que l'URL de chaque média soit correcte
                                    alt={`media-${index}`}
                                    className="post-media-image"
                                />
                            ))}
                        </div>
                    )} */}
                </>
            ) : (
                <p>Aucun post trouvé.</p>
            )}
        </div>
    );
};

export default PostDetail;
