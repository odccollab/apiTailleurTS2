import React, { useEffect, useState } from 'react';
import { FaTag, FaShoppingCart, FaListAlt } from 'react-icons/fa';
import useFetch from '../backend/Services/useFetch'; // Assuming you have this hook
import '../css/articles.css'; // Assure-toi d'avoir ce fichier CSS

const Articles = () => {
    const { data: article, loading, error } = useFetch('users/article'); // Replace with actual endpoint 
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (article && article.articles) {
            setArticles(article.articles);
            console.log(article.articles); 
        }
    }, [article]);

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error fetching articles.</p>;

    return (
        <div className="articles-container">
            {articles.length > 0 ? (
                articles.map((article) => (
                    <div key={article.id} className="article-card">
                        <div className="article-icon">
                            <FaTag />
                        </div>
                        <div className="article-details">
                            <h3>{article.libelle}</h3>
                            <p><FaListAlt className="icon" /> Catégorie: {article.categorie}</p>
                            <p><FaShoppingCart className="icon" /> Prix Unitaire: {article.prixUnitaire} €</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='not-articles'>AUCUN ARTICLES.</p>
            )}
        </div>
    );
};

export default Articles;
