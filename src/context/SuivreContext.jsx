import React, { createContext, useContext, useEffect, useState } from 'react';
import useFetch from "../backend/Services/useFetch";
import useSave from "../backend/Services/useSave";
import { useAuth } from './AuthContext';

// Crée le contexte
const SuivreContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useSuivre = () => useContext(SuivreContext);

export const SuivreProvider = ({ children }) => {
  const { user } = useAuth();
  const { saveData, isSaving, saveError } = useSave();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);

  // Gère la clé de stockage dans le localStorage
  const getStorageKey = (userId, followedId) => `follow_${userId}_${followedId}`;

  // Vérifie le statut de suivi et récupère les followers depuis l'API
  const checkFollowStatus = async (followedId) => {
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
        setFollowers(data);
        localStorage.setItem(storageKey, JSON.stringify(actualStatus));
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du statut:", error);
    }
  };

  // Gère l'action de suivre/désuivre un utilisateur
  const handleFollow = async (followedId) => {
    if (isSaving || !user?.id) return;

    try {
      const post = await saveData("users/follow", { followedId });

      if (!post.error) {
        const newStatus = !isFollowing;
        setIsFollowing(newStatus);
        const storageKey = getStorageKey(user.id, followedId);
        localStorage.setItem(storageKey, JSON.stringify(newStatus));
      }
    } catch (error) {
      console.error("Erreur lors du suivi:", error);
    }
  };

  return (
    <SuivreContext.Provider value={{
      isFollowing,
      followers,
      checkFollowStatus,
      handleFollow,
      isSaving,
      saveError
    }}>
      {children}
    </SuivreContext.Provider>
  );
};
