import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProduitBurger.css";

const ProduitBurger = () => {
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState({
    cheese: false,
    bacon: false,
    onionRings: false,
    extraSauce: false,
    fries: false,
    drink: false,
    salade: false,
    onion: false,
    cornichons: false,
    tomate: false,
    extraBurger: false,
  });
  const [drinkChoice, setDrinkChoice] = useState("Coca-Cola");
  const [isPromoActive, setIsPromoActive] = useState(false);
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const basePrice = 9.99;
  const promoDiscount = 0.25;
  const extrasPerPage = 6;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("promo") === "true") {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 11 && hour < 14) {
        setIsPromoActive(true);
        setExtras((prev) => ({ ...prev, fries: true, drink: true }));
      }
    }
  }, [location.search]);

  const handleExtraChange = (name) => {
    setExtras((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleQuantityChange = (type) => {
    if (type === "minus") setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    else setQuantity((prev) => prev + 1);
  };

  const calculatePrice = () => {
    let extrasPrice = 0;
    if (extras.cheese) extrasPrice += 1.5;
    if (extras.bacon) extrasPrice += 2;
    if (extras.onionRings) extrasPrice += 1.2;
    if (extras.extraSauce) extrasPrice += 0.8;
    if (extras.salade) extrasPrice += 1;
    if (extras.onion) extrasPrice += 0.7;
    if (extras.cornichons) extrasPrice += 0.7;
    if (extras.tomate) extrasPrice += 0.8;
    if (extras.extraBurger) extrasPrice += 3;
    if (!isPromoActive) {
      if (extras.fries) extrasPrice += 3;
      if (extras.drink) extrasPrice += 2.5;
    }
    let price = (basePrice + extrasPrice) * quantity;
    if (isPromoActive) price *= 1 - promoDiscount;
    return price.toFixed(2);
  };

  const handleAddToCart = () => {
    const order = {
      product: "Classic Grillz",
      quantity,
      extras: Object.keys(extras).filter((key) => extras[key]),
      drinkChoice: extras.drink ? drinkChoice : null,
      totalPrice: calculatePrice(),
    };
    console.log("Produit ajouté au panier :", order);
    alert("Produit ajouté au panier !");
  };

  const extrasData = [
    {
      name: "cheese",
      label: "Fromage",
      img: "https://images.unsplash.com/photo-1604152135912-04a3889f95c9",
      price: 1.5,
    },
    {
      name: "bacon",
      label: "Bacon",
      img: "https://images.unsplash.com/photo-1606755962773-1ec2f74a7f9f",
      price: 2,
    },
    {
      name: "onionRings",
      label: "Onion Rings",
      img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
      price: 1.2,
    },
    {
      name: "extraSauce",
      label: "Sauce",
      img: "https://images.unsplash.com/photo-1604909053158-ff2d3b8f88c6",
      price: 0.8,
    },
    {
      name: "fries",
      label: "Frites",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 3,
    },
    {
      name: "drink",
      label: "Boisson",
      img: "https://images.unsplash.com/photo-1571071630218-4c3a74b31c32",
      price: 2.5,
    },
    {
      name: "salade",
      label: "Salade",
      img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
      price: 1,
    },
    {
      name: "onion",
      label: "Oignons",
      img: "https://images.unsplash.com/photo-1603052875303-94f4210a5e8f",
      price: 0.7,
    },
    {
      name: "cornichons",
      label: "Cornichons",
      img: "https://images.unsplash.com/photo-1625940918780-53a6c0e66980",
      price: 0.7,
    },
    {
      name: "tomate",
      label: "Tomates",
      img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
      price: 0.8,
    },
    {
      name: "extraBurger",
      label: "Extra Burger",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 3,
    },
  ];

  const totalPages = Math.ceil(extrasData.length / extrasPerPage);

  const setPageWithAnimation = (newPage) => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage(newPage);
      setIsAnimating(false);
    }, 300);
  };

  const displayedExtras = extrasData.slice(
    page * extrasPerPage,
    page * extrasPerPage + extrasPerPage
  );

  return (
    <div className="produit-container">
      <div className="produit-main">
        <div className="produit-img">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349"
            alt="Classic Grillz Burger"
          />
          {isPromoActive && <div className="badge-promo">-25% Promo !</div>}
        </div>

        <div className="extras-carousel-container">
          <div className={`extras-carousel ${isAnimating ? "fade-out" : ""}`}>
            {displayedExtras.map(({ name, label, img, price }) => (
              <div
                key={name}
                className={`extra-item ${extras[name] ? "active" : ""}`}
                onClick={() => handleExtraChange(name)}
              >
                <div
                  className="extra-img"
                  style={{ backgroundImage: `url(${img})` }}
                />
                <div className="extra-info">
                  <span>{label}</span>
                  <small>+${price.toFixed(2)}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-dots">
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                className={`dot ${page === index ? "active" : ""}`}
                onClick={() => setPageWithAnimation(index)}
              ></span>
            ))}
          </div>
        </div>

        {extras.drink && (
          <select
            value={drinkChoice}
            onChange={(e) => setDrinkChoice(e.target.value)}
          >
            <option value="Coca-Cola">Coca-Cola</option>
            <option value="Pepsi">Pepsi</option>
            <option value="Fanta">Fanta</option>
            <option value="Sprite">Sprite</option>
            <option value="Eau">Eau</option>
          </select>
        )}
      </div>

      <div className="produit-details">
        <h1 className="produit-title">Classic Grillz</h1>
        <p className="produit-desc">
          Steak de bœuf 100% pur, cheddar américain, pickles, oignons, sauce
          Grillz. Simple, efficace, culte.
        </p>

        <div className="produit-price">
          {isPromoActive ? (
            <>
              <span className="old-price">${basePrice.toFixed(2)}</span>{" "}
              <span className="promo-price">
                ${(basePrice * (1 - promoDiscount)).toFixed(2)}
              </span>
            </>
          ) : (
            <span>${basePrice.toFixed(2)}</span>
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
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value) > 0 ? Number(e.target.value) : 1
                )
              }
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
