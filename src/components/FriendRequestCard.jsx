import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Follow from "../backend/Services/Follow.js";

const FriendRequestCard = ({ friendRequests = [] }) => {
    const { friendRequests: friends, setfriendRequests } = useAuth();

    // Met à jour la liste des demandes d'amis à partir des props au chargement du composant
    useEffect(() => {
        setfriendRequests(friendRequests);
    }, [friendRequests, setfriendRequests]);

    const { isFollowing, handleFollow, modifyArray, isSaving, saveError } = Follow();

    // Fonction pour gérer l'action de suivi et supprimer la demande
    const onClickFollow = async (friend) => {
        try {
            // Appelle la fonction de suivi
            await handleFollow(friend.id);

            // Modifie le tableau des demandes d'amis en supprimant l'ami confirmé
            const updatedFriends = modifyArray(friends, friend, 'remove');
            setfriendRequests(updatedFriends);
        } catch (error) {
            console.error("Erreur lors de l'action de suivi:", error);
        }
    };

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Friend Requests</h4>
                <a href="default-member.html" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>

            {friends.map((request, index) => (
                <React.Fragment key={request.id}>
                    <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                        <figure className="avatar me-3">
                            <img src={request.image} alt="user" className="shadow-sm rounded-circle w45" />
                        </figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            {`${request.prenom} ${request.nom}`}
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                {request.mutualFriends} mutual friends
                            </span>
                        </h4>
                    </div>
                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                        <button
                            id="confirm"
                            onClick={() => onClickFollow(request)}
                            className="p-2 lh-20 w100 bg-blue-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl"
                            disabled={isSaving}
                        >
                            {isSaving ? "Confirming..." : "Confirm"}
                        </button>
                        <button
                            id="delete"
                            onClick={() => {
                                const updatedFriends = modifyArray(friends, request, 'remove');
                                setfriendRequests(updatedFriends);
                            }}
                            className="p-2 lh-20 w100 bg-red-gradiant text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl"
                        >
                            Delete
                        </button>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default FriendRequestCard;
