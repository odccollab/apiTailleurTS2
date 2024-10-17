import React, { useState } from 'react';

const ProductCard = ({ product }) => {
    const [showInput, setShowInput] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleOrderClick = () => {
        setShowInput(true);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleConfirmOrder = () => {
        alert(`Order placed for ${quantity} ${product.name}(s)!`);
        setShowInput(false); // Hide input after confirmation
        setQuantity(1); // Reset quantity
    };

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-0 shadow-sm">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">{product.name}</h5>
                    <p className="card-text text-muted">{product.description}</p>
                    <p className="text-muted fs-5">${product.price.toFixed(2)}</p>

                    {!showInput ? (
                        <button
                            className="btn btn-primary"
                            onClick={handleOrderClick}
                        >
                            Commander
                        </button>
                    ) : (
                        <div className="input-group mb-3">
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
                                Valider
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
