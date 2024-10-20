import React, { useState, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import "../css/produitCard.css";
import useFetch from '../backend/Services/useFetch';
import useSave from '../backend/Services/useSave';
import { Plus, Minus, Check, X } from 'lucide-react';



// Tableau d'URLs d'images Unsplash correctement formatées
const placeholderImages = [
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80", // Robe élégante
    "https://images.unsplash.com/photo-1525845859779-54d477ff291f?auto=format&fit=crop&w=800&q=80", // Tailleur
    "https://images.unsplash.com/photo-1551048632-c72a365b176e?auto=format&fit=crop&w=800&q=80", // Blouse
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80", // Robe de soirée
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", // Mode femme

    // Vêtements homme
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80", // Costume
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80", // Chemise
    "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80", // Veste
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80", // Mode homme

    // Accessoires et détails
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80", // Boutons
    "https://images.unsplash.com/photo-1520263115673-610416f52ab6?auto=format&fit=crop&w=800&q=80", // Fils
    "https://images.unsplash.com/photo-1586749983954-741c99a4a856?auto=format&fit=crop&w=800&q=80", // Machine à coudre

    // Tissus et matériaux
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80", // Tissus
    "https://images.unsplash.com/photo-1544627624-1f70336dcb46?auto=format&fit=crop&w=800&q=80", // Patrons
    "https://images.unsplash.com/photo-1584722065001-ee7f49fb1145?auto=format&fit=crop&w=800&q=80", // Matériaux

    // Collections spéciales
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80", // Haute couture
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80", // Atelier
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80", // Présentoir

    // Robes et tenues de soirée
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80", // Robe de mariée
    "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80", // Robe cocktail
    "https://images.unsplash.com/photo-1502727135886-df285cc8379f?auto=format&fit=crop&w=800&q=80", // Tenue de soirée

    // Mode urbaine
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80", // Street wear
    "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=800&q=80", // Casual chic
    "https://images.unsplash.com/photo-1467043198406-dc953a3defa0?auto=format&fit=crop&w=800&q=80",
];

const ProductCard = ({ product }) => {
    const [showInput, setShowInput] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const { saveData, isSaving, error: saveError } = useSave();
  
    const randomImage = useMemo(() => {
      const randomIndex = Math.floor(Math.random() * placeholderImages.length);
      return placeholderImages[randomIndex];
    }, []);
  
    const handleOrderClick = () => {
      setShowInput(true);
    };
  
    const handleCancelClick = () => {
      setShowInput(false);
      setQuantity(1);
    };
  
    const handleQuantityChange = (e) => {newOrderData
      setQuantity(+e.target.value);
    };
  
    const handleConfirmOrder = async () => {
      if (quantity > 0) {
        try {
           await saveData('users/commande', {
            articles: [
              {
                idArticle: product.id,
                quantite: quantity
              }
            ]
          });
          setPopupMessage(`Commande confirmée: ${quantity} ${product.libelle}(s)!`);
          setShowPopup(true);
          setShowInput(false);
          setQuantity(1);
        } catch (err) {
          console.error('Error placing order:', err);
          setPopupMessage('Erreur lors de la commande. Veuillez réessayer.');
          setShowPopup(true);
        }
      }
    };
  
    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100 border-0 shadow-sm">
          <img
            className="card-img-top"
            src={product.imageUrl || randomImage}
            alt={product.libelle || 'Product image'}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = randomImage;
            }}
            style={{
              width: '100%',
              height: '50%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div className="card-body">
            <h5 className="card-title fw-bold text-dark">nom : {product.libelle || 'Unnamed Product'}</h5>
            <p className="card-text text-muted">categorie : {product.categorie || 'No description available'}</p>
            <p className="text-muted fs-5">prix ${product.prixUnitaire?.toFixed(2) || 'N/A'}</p>
            <p className="text-muted fs-5">Stock: {product.quantiteStock ?? 'Unknown'}</p>
  
            {!showInput ? (
              <button
                className="btn btn-primary w-100 text-white"
                onClick={handleOrderClick}
              >
                Commander
              </button>
            ) : (
              <div className="d-flex flex-column">
                <div className="input-group mb-2">
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                  />
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmOrder}
                  >
                    <Check size={18} className="me-2" />
                    Valider
                  </button>
                </div>
                <button
                  className="btn btn-danger w-100"
                  onClick={handleCancelClick}
                >
                     <X size={18} className="me-2" />
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
  
        {showPopup && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="bg-white p-4 rounded shadow-lg">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Confirmation</h5>
                <button className="btn btn-close" onClick={() => setShowPopup(false)}></button>
              </div>
              <p>{popupMessage}</p>
              <button className="btn btn-primary mt-2" onClick={() => setShowPopup(false)}>Fermer</button>
            </div>
          </div>
        )}
  
        {saveError && <p className="error-message">Error placing order: {saveError.message}</p>}
      </div>
    );
  };
  
  export default ProductCard;