import React from 'react';

const ArticleItem = ({ title, content, authorName, publishedDate }) => {
    return (
        <div className="article-item">
            <h3>{title}</h3>
            <p>{content}</p>
            <div className="article-footer">
                <span>{authorName}</span>
                <span>{publishedDate}</span>
            </div>
        </div>
    );
};

export default ArticleItem;
