import React, { createContext, useContext, useEffect, useState } from 'react';
import useFetch from "../backend/Services/useFetch";
import useSave from "../backend/Services/useSave";
import { useAuth } from './AuthContext';

// Création du contexte
const SuivreContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useSuivre = () => useContext(SuivreContext);

export const SuivreProvider = ({ children }) => {
  const { user } = useAuth();
  const { saveData, isSaving, saveError } = useSave();
  
  // Stocke tous les statuts de suivi dans un objet
  const [followStatus, setFollowStatus] = useState({});
  // Liste de tous les followers
  const [followers, setFollowers] = useState([]);
  // Liste de tous les utilisateurs que l'utilisateur courant suit
  const [following, setFollowing] = useState([]);

  // Gère la clé de stockage dans le localStorage
  const getStorageKey = (userId, followedId) => `follow_${userId}_${followedId}`;

  // Initialise les données de suivi au chargement
  useEffect(() => {
    if (user?.id) {
      fetchFollowData();
    }
  }, [user?.id]);

  // Récupère toutes les données de suivi
  const fetchFollowData = async () => {
    try {
      // Récupère les followers
      const followersResponse = await useFetch("users/followers");
      if (!followersResponse.error && followersResponse.data) {
        setFollowers(followersResponse.data);
      }

      // Récupère les following
      const followingResponse = await useFetch("users/following");
      if (!followingResponse.error && followingResponse.data) {
        setFollowing(followingResponse.data);
        
        // Met à jour le statut de suivi pour chaque utilisateur
        const newFollowStatus = {};
        followingResponse.data.forEach(user => {
          newFollowStatus[user.id] = true;
        });
        setFollowStatus(newFollowStatus);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données de suivi:", error);
    }
  };

  // Vérifie si l'utilisateur suit un autre utilisateur
  const isFollowing = (followedId) => {
    return !!followStatus[followedId];
  };

  // Gère l'action de suivre/ne plus suivre
  const handleFollow = async (followedId) => {
    if (isSaving || !user?.id) return;

    try {
      const response = await saveData("users/follow", { followedId });
      
      if (!response.error) {
        // Met à jour le statut localement
        setFollowStatus(prev => ({
          ...prev,
          [followedId]: !prev[followedId]
        }));

        // Met à jour la liste des following
        if (!followStatus[followedId]) {
          setFollowing(prev => [...prev, { id: followedId }]);
        } else {
          setFollowing(prev => prev.filter(f => f.id !== followedId));
        }

        // Stocke dans le localStorage
        const storageKey = getStorageKey(user.id, followedId);
        localStorage.setItem(storageKey, JSON.stringify(!followStatus[followedId]));
      }
    } catch (error) {
      console.error("Erreur lors du suivi:", error);
    }
  };

  // Obtient les statistiques de suivi
  const getFollowStats = (userId) => {
    return {
      followersCount: followers.filter(f => f.id === userId).length,
      followingCount: following.length
    };
  };

  return (
    <SuivreContext.Provider value={{
      followers,
      following,
      isFollowing,
      handleFollow,
      getFollowStats,
      isSaving,
      saveError,
      refreshFollowData: fetchFollowData
    }}>
      {children}
    </SuivreContext.Provider>
  );
};