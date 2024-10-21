import React from 'react';
import { useSuivre } from "../context/SuivreContext";
import { useAuth } from '../context/AuthContext';

const FollowButton = ({ followedId }) => {
  const { user } = useAuth();
  const { 
    isFollowing, 
    handleFollow, 
    isSaving, 
    saveError 
  } = useSuivre();

  // Si l'utilisateur essaie de se suivre lui-même, on ne montre pas le bouton
  if (followedId === user?.id) {
    return null;
  }

  // Vérifie si l'utilisateur actuel suit déjà l'utilisateur cible
  const isFollowingUser = isFollowing(followedId);

  return (
    <>
      <button
        onClick={() => handleFollow(followedId)}
        disabled={isSaving}
        className={`
          font-bold 
          py-1 
          px-2 
          rounded-full
          ${isFollowingUser
            ? 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }
          transition-all 
          duration-200
        `}
      >
        {isFollowingUser ? 'Suivi(e)' : 'Suivre'}
      </button>
      
      {saveError && (
        <div className="text-red-500 text-sm mt-1">
          {saveError}
        </div>
      )}
    </>
  );
};

export default FollowButton;