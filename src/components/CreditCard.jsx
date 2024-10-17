import React from 'react';
import { FaCoins } from 'react-icons/fa';
import '../css/creditCard.css'; // Fichier CSS pour le style

const CreditCard = ({ credit }) => {
    const isLowCredit = credit < 10;

    return (
        <div className="credit-card-container">
            <div className="credit-card-content">
                <FaCoins className="credit-icon" />
                <div>
                    <h3
                        className="credit-amount"
                        style={{ color: isLowCredit ? 'red' : 'white' }}
                    >
                        {credit || 0} Crédits
                    </h3>
                    <p
                        className="credit-description"
                        style={{ color: isLowCredit ? 'red' : 'white' }}
                    >
                        {isLowCredit ? "Veuillez recharger votre compte" : "Votre solde actuel"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;