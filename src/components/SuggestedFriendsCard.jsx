import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Follow from "../backend/Services/Follow.js";

const SuggestedFriendsCard = ({ suggestedFriends = [] }) => {
    const { suggestedFriend, setsuggestedFriend } = useAuth();
    const navigate = useNavigate();
    const [savingFriendId, setSavingFriendId] = useState(null); // Nouvel état pour stocker l'ID du bouton en cours de traitement

    useEffect(() => {
        setsuggestedFriend(suggestedFriends);
    }, [suggestedFriends, setsuggestedFriend]);

    const { handleFollow, modifyArray } = Follow(); // Utilisez la fonction handleFollow pour gérer le suivi

    // Gérer la navigation vers le profil
    const handleProfileClick = (friendId) => {
        navigate(`/profile/${friendId}`);
    };

    // Gérer l'ajout d'amis (follow)
    const handleAddFriend = async (friend) => {
        setSavingFriendId(friend.id); // Mettre à jour l'ID du bouton en cours de traitement
        try {
            await handleFollow(friend.id); // Suivre l'ami
            const updatedFriends = modifyArray(suggestedFriend, friend, 'remove');
            setsuggestedFriend(updatedFriends); // Mettre à jour la liste des amis suggérés
        } catch (error) {
            console.error("Erreur lors de l'ajout d'amis :", error);
        } finally {
            setSavingFriendId(null); // Réinitialiser l'état après l'opération
        }
    };

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 z-index-12">
            <div className="card-body d-flex align-items-center p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggested Friends</h4>
                <a href="default-suggestions.html" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            {suggestedFriend.map((friend, index) => (
                <React.Fragment key={friend.id}>
                    <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                        <figure className="avatar me-3">
                            <img src={friend.image} alt="user" className="shadow-sm rounded-circle w45" />
                        </figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            {`${friend.prenom} ${friend.nom}`}
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                {friend.mutualFriends} mutual friends
                            </span>
                        </h4>
                    </div>
                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                        {/* Bouton pour ajouter en tant qu'ami */}
                        <button
                            onClick={() => handleAddFriend(friend)}
                            className="p-2 lh-20 w100 bg-blue-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl btn-primary"
                            disabled={savingFriendId === friend.id} // Désactiver seulement si cet ami est en cours de traitement
                        >
                            {savingFriendId === friend.id ? "Adding..." : "Add Friend"}
                        </button>

                        {/* Bouton pour naviguer vers le profil */}
                        <button
                            onClick={() => handleProfileClick(friend.id)}
                            className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl"
                        >
                            Profile
                        </button>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default SuggestedFriendsCard;
