import React, { useEffect, useState } from 'react';
import useFetch from "../backend/Services/useFetch";
import useSave from "../backend/Services/useSave";
import { useFollow } from "../context/FollowContext";
import { useAuth } from '../context/AuthContext';
import { blue } from '@mui/material/colors';

const Follow = ({ followedId }) => {
  const { user } = useAuth();
  const { saveData, isSaving, saveError } = useSave();
  const { theme, toggleFollow } = useFollow();
  const [isFollowing, setIsFollowing] = useState(false);

  const getStorageKey = (userId, followedId) => `follow_${userId}_${followedId}`;

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!user?.id || !followedId) return;

      const storageKey = getStorageKey(user.id, followedId);
      const storedStatus = localStorage.getItem(storageKey);
      
      if (storedStatus !== null) {
        setIsFollowing(JSON.parse(storedStatus));
      }

      try {
        const { data, error } = await useFetch("users/followers");
        if (!error && data) {
          const actualStatus = data.some(follower => follower.id === followedId);
          setIsFollowing(actualStatus);
          localStorage.setItem(storageKey, JSON.stringify(actualStatus));
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du statut:", error);
      }
    };

    checkFollowStatus();
  }, [user?.id, followedId]);

  const handleFollow = async () => {
    if (isSaving || !user?.id) return;

    try {
      const post = await saveData("users/follow", { followedId });
      
      if (!post.error) {
        const newStatus = !isFollowing;
        setIsFollowing(newStatus);
        toggleFollow();
        
        const storageKey = getStorageKey(user.id, followedId);
        localStorage.setItem(storageKey, JSON.stringify(newStatus));
      }
    } catch (error) {
      console.error("Erreur lors du suivi:", error);
    }
  };

  if (followedId === user?.id) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleFollow}
        disabled={isSaving}
        style={{
            backgroundColor: 'blue',}}
        className={`
          font-bold py-1 px-2 rounded
          ${isFollowing 
            ? 'bg-white text-black border border-gray-300 hover:bg-gray-100' 
            : `bg-blue text-white hover:opacity-90`
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

export default Follow;