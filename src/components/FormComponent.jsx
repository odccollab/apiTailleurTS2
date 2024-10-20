import { useState } from 'react';
import '../css/form.css';
import useSave from '../backend/Services/useSave.js';
import {UseArticle}  from '../context/ArticleContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        libelle: '',
        prixUnitaire: 0,
        quantiteStock: 0,
        categorie: ''
    });

    const { saveData, isSaving, saveError } = useSave();
    const { articles, addArticle,setArticles } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: ['prixUnitaire', 'quantiteStock'].includes(name) ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data to submit:', formData);
        console.log(articles);

        try {
            const response = await saveData('users/article', formData);
            
            if (response ) {
                console.log('Article created successfully');
                addArticle(response);


                // Reset form
                setFormData({
                    libelle: '',
                    prixUnitaire: 0,
                    quantiteStock: 0,
                    categorie: ''
                });
                
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="right-chat-form">
          <div className="form-header">
            <h2>Ajouter un nouvel article</h2>
            <p>Remplissez les informations de votre article</p>
          </div>
    
          {saveError && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#C62828"/>
              </svg>
              {saveError}
            </div>
          )}
    
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="libelle">Libellé</label>
              <input
                type="text"
                id="libelle"
                name="libelle"
                value={formData.libelle}
                onChange={handleChange}
                placeholder="Nom de l'article"
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="categorie">Catégorie</label>
              <input
                type="text"
                id="categorie"
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                placeholder="Catégorie de l'article"
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="prixUnitaire">Prix Unitaire (€)</label>
              <input
                type="number"
                id="prixUnitaire"
                name="prixUnitaire"
                value={formData.prixUnitaire}
                onChange={handleChange}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="quantiteStock">Quantité en Stock</label>
              <input
                type="number"
                id="quantiteStock"
                name="quantiteStock"
                value={formData.quantiteStock}
                onChange={handleChange}
                placeholder="0"
                required
                min="0"
              />
            </div>
    
            <button type="submit" className="submit-button" disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="loading-spinner"></span>
                  Enregistrement...
                </>
              ) : (
                'Ajouter l\'article'
              )}
            </button>
          </form>
        </div>
      );
};

export default FormComponent;