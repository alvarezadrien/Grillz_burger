import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProduitBurger.css";

const ProduitBurger = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [burger, setBurger] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState({});

  // 🔹 Récupération du burger depuis l'API
  useEffect(() => {
    fetch(`https://grillzburger.onrender.com/api/burgers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) return navigate("/burgers");
        setBurger(data);

        // Initialiser les extras disponibles
        const initialExtras = {};
        data.additions?.forEach((extra) => (initialExtras[extra.name] = false));
        setExtras(initialExtras);
      })
      .catch(() => navigate("/burgers"));
  }, [id, navigate]);

  const handleExtraChange = (name) => {
    setExtras((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "minus" ? Math.max(1, prev - 1) : prev + 1
    );
  };

  const calculatePrice = () => {
    if (!burger) return 0;
    let extrasPrice = 0;
    burger.additions?.forEach((extra) => {
      if (extras[extra.name]) extrasPrice += extra.price || 0;
    });
    return ((burger.price + extrasPrice) * quantity).toFixed(2);
  };

  if (!burger) return <p>Chargement du burger...</p>;

  return (
    <div className="produit-container">
      <div className="produit-main">
        <div className="produit-img">
          <img src={burger.image} alt={burger.name} />
        </div>

        {burger.additions?.length > 0 && (
          <div className="extras-carousel-container">
            {burger.additions.map((extra) => (
              <div
                key={extra._id}
                className={`extra-item ${extras[extra.name] ? "active" : ""}`}
                onClick={() => handleExtraChange(extra.name)}
              >
                <div className="extra-info">
                  <span>{extra.name}</span>
                  <small>+${extra.price.toFixed(2)}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="produit-details">
        <h1 className="produit-title">{burger.name}</h1>
        <p className="produit-desc">{burger.description}</p>

        <div className="produit-price">
          <span>${burger.price.toFixed(2)}</span>
        </div>

        <div className="quantity">
          <label>Quantité :</label>
          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange("minus")}>-</button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
            <button onClick={() => handleQuantityChange("plus")}>+</button>
          </div>
        </div>

        <div className="total">
          <h2>Total : ${calculatePrice()}</h2>
        </div>

        <button
          className="btn-add"
          onClick={() => alert(`${burger.name} ajouté au panier !`)}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProduitBurger;
