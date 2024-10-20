import React, { useEffect } from 'react';
import { useSuivre } from "../context/SuivreContext";
import { useAuth } from '../context/AuthContext';

const FollowButton = ({ followedId }) => {
  const { user } = useAuth();
  const { isFollowing, checkFollowStatus, handleFollow, isSaving, saveError } = useSuivre();

  useEffect(() => {
    if (user?.id && followedId) {
      checkFollowStatus(followedId);
    }
  }, [user?.id, followedId]);

  if (followedId === user?.id) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => handleFollow(followedId)}
        disabled={isSaving}
        className={`
          font-bold py-1 px-2 rounded
          ${isFollowing 
            ? 'bg-white text-black border border-gray-300 hover:bg-gray-100' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }
          transition-all duration-200
        `}
      >
        {isFollowing ? 'Suivi(e)' : 'Suivre'}
      </button>
      {saveError && <div className="text-red-500 text-sm mt-1">{saveError}</div>}
    </>
  );
};

export default FollowButton;
