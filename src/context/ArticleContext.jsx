import React, { createContext, useState, useContext } from 'react';

const ArticleContext = createContext();


export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  const addArticle = (newArticle) => {
    setArticles(prevArticles => [...prevArticles, newArticle]);
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, setArticles }}>
      {children}
    </ArticleContext.Provider>
  );
  
};  
export const UseArticle = () => useContext(ArticleContext)
