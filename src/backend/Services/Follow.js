import { useState } from 'react';
import useSave from "./useSave";
import { useAuth } from '../../context/AuthContext';

// Hook personnalisé pour gérer le suivi
const useFollow = () => {
    const { user } = useAuth();
    const { saveData, isSaving, saveError } = useSave();
    const [isFollowing, setIsFollowing] = useState(false);

    // Gère l'action de suivre/désuivre un utilisateur
    const handleFollow = async (followedId) => {
        if (isSaving || !user?.id) return;

        try {
            const post = await saveData("users/follow", { followedId });

            if (!post.error) {
                setIsFollowing(!isFollowing); // Toggle le statut de suivi
            }
        } catch (error) {
            console.error("Erreur lors du suivi:", error);
        }
    };

    // Fonction pour ajouter ou retirer un élément dans un tableau
    const modifyArray = (array, element, action) => {
        if (action === 'add') {
            return [...array, element];
        } else if (action === 'remove') {
            return array.filter(item => item !== element);
        }
        return array;
    };

    return {
        isFollowing,
        handleFollow,
        modifyArray,
        isSaving,
        saveError
    };
};

export default useFollow;
