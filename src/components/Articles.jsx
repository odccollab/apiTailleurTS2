import React, { useEffect, useState } from 'react';
import useFetch from '../backend/Services/useFetch'; // Assuming you have this hook

const Articles = () => {
    const { data: articles, loading, error } = useFetch('articles/user'); // Replace with actual endpoint

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error fetching articles.</p>;

    return (
        <div className="articles-container">
            {articles.length > 0 ? (
                articles.map((article) => (
                    <div key={article.id} className="article-item">
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                    </div>
                ))
            ) : (
                <p>No articles available.</p>
            )}
        </div>
    );
};

export default Articles;
