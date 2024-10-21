import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSave from '../backend/Services/useSave';
import CustomAlert from './Alert/CustomAlert'; // Import du CustomAlert
import PostItem from './PostItem.jsx';
import FriendRequestCard from './FriendRequestCard.jsx';
import { User, FileText } from 'lucide-react';
import '../css/search.css';

const SearchComponent = () => {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const { saveData, isSaving, saveError } = useSave();
    const [loadingFinished, setLoadingFinished] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false); // État pour afficher l'alerte
    const [alertConfig, setAlertConfig] = useState({}); // Configuration de l'alerte

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            setLoadingFinished(false);
            saveData("posts/find", { value: query })
                .then(response => {
                    if (response) {
                        if (response.posts) setPosts(response.posts);
                        if (response.users) setUsers(response.users);

                        // Afficher une alerte personnalisée si aucun résultat trouvé
                        if (response.posts.length === 0 && response.users.length === 0) {
                            setAlertConfig({
                                title: 'Aucun résultat',
                                message: `Aucun utilisateur ou post trouvé pour "${query}".`,
                                icon: 'info',
                                confirmText: 'OK'
                            });
                            setAlertVisible(true); // Affiche l'alerte
                        }
                    }
                })
                .finally(() => setLoadingFinished(true))
                .catch(error => {
                    console.error("Erreur lors de la récupération des posts/utilisateurs :", error);

                    // Afficher une alerte en cas d'erreur
                    setAlertConfig({
                        title: 'Erreur',
                        message: 'Erreur lors de la récupération des données.',
                        icon: 'error',
                        confirmText: 'OK'
                    });
                    setAlertVisible(true); // Affiche l'alerte
                });
        }
    }, [query]);

    return (
        <div className="search-results-page mx-auto p-4 bg-white rounded-lg shadow-lg mt-8">
            {/* <CustomAlert
                show={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                icon={alertConfig.icon}
                confirmText={alertConfig.confirmText}
                onConfirm={() => setAlertVisible(false)} 
            /> */}

            <div className="search-header mb-4">
                <h2 className="text-center text-xl font-bold text-blue-600">
                    Résultats de recherche pour "{query}"
                </h2>
                <hr className="my-2 border-gray-300" />
            </div>

            {isSaving && !loadingFinished && (
                <div className="text-center my-6">
                    <div className="spinner-border text-blue-500" role="status">
                        <span className="sr-only">Chargement...</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Chargement des résultats...</p>
                </div>
            )}

            {saveError && <p className="text-red-500 text-center">{saveError}</p>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Résultats des utilisateurs */}
                <div className="col-span-1">
                    {users.length > 0 ? (
                        <div className="user-results bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                <User className="h-6 w-6 mr-2 text-blue-600" />
                                Utilisateurs
                            </h3>
                            {users.map(user => (
                                <FriendRequestCard
                                    friendRequests={users}
                                />
                            ))}
                        </div>
                    ) : (
                        loadingFinished && !isSaving && (
                            <p className="text-gray-500 text-center">Aucun utilisateur trouvé pour "{query}".</p>
                        )
                    )}
                </div>

                {/* Résultats des posts */}
                <div className="col-span-2">
                    {posts.length > 0 ? (
                        <div className="post-results">
                            <h2 className="text-lg font-bold mb-3 flex items-center">
                                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                                Posts
                            </h2>
                            {posts.map(post => (
                                <div className=" p-4 rounded-lg shadow-md mb-4 text-white post-div" key={post.id}>
                                    <PostItem
                                        key={post.id}
                                        userImage={`${post.user.image}`}
                                        userName={`${post.user.prenom} ${post.user.nom}`}
                                        timeAgo={new Date(post.createdAt).toLocaleString()}
                                        content={post.contenu}
                                        media={post.contenuMedia}
                                        likes={post.likes || "0"}
                                        comments={post.comments || "0"}
                                        id={post.id}
                                        views={post.viewers || "0"}
                                        idUser={post.idUser}
                                        favorite={post.favorite}
                                        likeStatus={post.likeStatus}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        loadingFinished && !isSaving && (
                            <p className="text-gray-500 text-center">Aucun post trouvé pour "{query}".</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;