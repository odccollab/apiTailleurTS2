import React from 'react';
import '../../css/customAlert.css'; // Assurez-vous de créer ce fichier pour le style

const CustomAlert = ({
                         show,            // Contrôle la visibilité de l'alerte
                         title,           // Titre de l'alerte
                         message,         // Message du corps de l'alerte
                         icon,            // Icône (info, success, error, warning)
                         confirmText,     // Texte du bouton de confirmation
                         onConfirm        // Fonction à exécuter lorsque l'utilisateur clique sur "OK"
                     }) => {

    if (!show) return null; // Ne rend pas l'alerte si elle n'est pas visible

    const getIconClass = () => {
        switch (icon) {
            case 'success':
                return 'alert-icon success-icon';
            case 'error':
                return 'alert-icon error-icon';
            case 'warning':
                return 'alert-icon warning-icon';
            case 'info':
            default:
                return 'alert-icon info-icon';
        }
    };

    return (
        <div className="custom-alert-overlay">
            <div className="custom-alert-box">
                <div className={getIconClass()}></div>
                <h2 className="custom-alert-title">{title}</h2>
                <p className="custom-alert-message">{message}</p>
                <button className="custom-alert-confirm-button" onClick={onConfirm}>
                    {confirmText || 'OK'}
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;