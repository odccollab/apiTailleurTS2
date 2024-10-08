import {useEffect, useState} from "react";

import CButton from "./CButton.jsx";
import MyForm from "./Login2.jsx";

const LikeDislike = () => {
    // État pour garder la trace de l'action en cours : "like", "dislike", ou null
    const [action, setAction] = useState(null);

    // Gestion des likes
    const handleLike = () => {
        // Si l'utilisateur clique sur "Like" alors que "Like" est déjà activé, on réinitialise
        if (action === 'like') {
            setAction(null); // Réinitialiser
        } else {
            setAction('like'); // Activer "Like"
        }
    };
    useEffect(() => {

        console.log("Le composant LikeDislike a été monté.");
        return () => {
            console.log("Le composant LikeDislike va être démonté.");
        };
    }, [action]); // Le tableau vide indique que l'effet ne s'exécute qu'à la montée et au démontage

    useEffect(() => {
            console.log(`Action mise à jour : ${action}`);
    }, [action]); // Cet effet s'exécute chaque fois que 'action' change

    // Gestion des dislikes
    const handleDislike = () => {
        // Si l'utilisateur clique sur "Dislike" alors que "Dislike" est déjà activé, on réinitialise
        if (action === 'dislike') {
            setAction(null); // Réinitialiser
        } else {
            setAction('dislike'); // Activer "Dislike"
        }
    };

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                {/* Utilisation du composant CButton avec gestion des couleurs */}
                <CButton
                    onClick={handleLike}
                    text={`Like`}
                    style={{
                        backgroundColor: action === 'like' ? 'blue' : 'white', // Coloration du bouton Like
                        color: action === 'like' ? 'white' : 'black',
                    }}
                />
                <CButton
                    onClick={handleDislike}
                    text={`Dislike`}
                    style={{
                        backgroundColor: action === 'dislike' ? 'red' : 'white', // Coloration du bouton Dislike
                        color: action === 'dislike' ? 'white' : 'black',
                    }}
                />
                <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <MyForm/>
        </>
    );
};
export  default LikeDislike;
