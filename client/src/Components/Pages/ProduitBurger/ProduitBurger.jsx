import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProduitBurger.css";

const ProduitBurger = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [burger, setBurger] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState({});
  const [isPromoActive, setIsPromoActive] = useState(false);
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const extrasPerPage = 6; // 2 lignes de 3 extras par page

  // 🔹 Récupérer le burger depuis l'API
  useEffect(() => {
    fetch(`https://grillzburger.onrender.com/api/burgers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) navigate("/burgers");
        setBurger(data);

        // Initialiser extras disponibles
        const initialExtras = {};
        data.extras?.forEach((extra) => (initialExtras[extra.name] = false));
        setExtras(initialExtras);

        // Vérifier promo
        if (data.promo) {
          const hour = new Date().getHours();
          if (hour >= 11 && hour < 14) setIsPromoActive(true);
        }
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
    burger.extras?.forEach((extra) => {
      if (extras[extra.name]) extrasPrice += extra.price || 0;
    });
    let price = (burger.price + extrasPrice) * quantity;
    if (isPromoActive) price *= 0.75; // Promo -25%
    return price.toFixed(2);
  };

  const handleAddToCart = () => {
    const order = {
      product: burger.name,
      quantity,
      extras: Object.keys(extras).filter((key) => extras[key]),
      totalPrice: calculatePrice(),
    };
    console.log("Produit ajouté au panier :", order);
    alert(`${burger.name} ajouté au panier !`);
  };

  if (!burger) return null;

  // Pagination des extras
  const totalPages = Math.ceil((burger.extras?.length || 0) / extrasPerPage);
  const displayedExtras = burger.extras?.slice(
    page * extrasPerPage,
    page * extrasPerPage + extrasPerPage
  );

  const setPageWithAnimation = (newPage) => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage(newPage);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="produit-container">
      <div className="produit-main">
        <div className="produit-img">
          <img src={burger.imagec} alt={burger.name} />
          {isPromoActive && <div className="badge-promo">-25% Promo !</div>}
        </div>

        {displayedExtras?.length > 0 && (
          <div className="extras-carousel-container">
            <div className={`extras-carousel ${isAnimating ? "fade-out" : ""}`}>
              {displayedExtras.map((extra) => (
                <div
                  key={extra.name}
                  className={`extra-item ${extras[extra.name] ? "active" : ""}`}
                  onClick={() => handleExtraChange(extra.name)}
                >
                  <div
                    className="extra-img"
                    style={{ backgroundImage: `url(${extra.img})` }}
                  />
                  <div className="extra-info">
                    <span>{extra.label}</span>
                    <small>+${extra.price.toFixed(2)}</small>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-dots">
              {Array.from({ length: totalPages }, (_, i) => (
                <span
                  key={i}
                  className={`dot ${page === i ? "active" : ""}`}
                  onClick={() => setPageWithAnimation(i)}
                ></span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="produit-details">
        <h1 className="produit-title">{burger.name}</h1>
        <p className="produit-desc">{burger.description}</p>

        <div className="produit-price">
          {isPromoActive ? (
            <>
              <span className="old-price">${burger.price.toFixed(2)}</span>{" "}
              <span className="promo-price">
                ${(burger.price * 0.75).toFixed(2)}
              </span>
            </>
          ) : (
            <span>${burger.price.toFixed(2)}</span>
          )}
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

        <button className="btn-add" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProduitBurger;
