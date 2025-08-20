import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProduitBurger.css";
import BurgerImg from "../../../assets/images/Classic_grillz.png";

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
  });
  const [drinkChoice, setDrinkChoice] = useState("Coca-Cola");

  const basePrice = 9.99;
  const promoDiscount = 0.25; // 25%
  const [isPromoActive, setIsPromoActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("promo") === "true") {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 11 && hour < 14) {
        setIsPromoActive(true);
        // Cocher automatiquement frites et boisson pendant promo
        setExtras((prev) => ({ ...prev, fries: true, drink: true }));
      }
    }
  }, [location.search]);

  const handleExtraChange = (e) => {
    const { name, checked } = e.target;
    setExtras((prev) => ({ ...prev, [name]: checked }));
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

    // Frites et boisson offertes pendant la promo
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

  return (
    <div className="produit-container">
      <div className="produit-img">
        <img src={BurgerImg} alt="Classic Grillz Burger" />
        {isPromoActive && <div className="badge-promo">-25% Promo !</div>}
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

        <div className="extras">
          <h3>Extras :</h3>
          <label>
            <input
              type="checkbox"
              name="cheese"
              checked={extras.cheese}
              onChange={handleExtraChange}
            />
            Fromage (+$1.50)
          </label>
          <label>
            <input
              type="checkbox"
              name="bacon"
              checked={extras.bacon}
              onChange={handleExtraChange}
            />
            Bacon (+$2.00)
          </label>
          <label>
            <input
              type="checkbox"
              name="onionRings"
              checked={extras.onionRings}
              onChange={handleExtraChange}
            />
            Onion Rings (+$1.20)
          </label>
          <label>
            <input
              type="checkbox"
              name="extraSauce"
              checked={extras.extraSauce}
              onChange={handleExtraChange}
            />
            Sauce supplémentaire (+$0.80)
          </label>
          <label>
            <input
              type="checkbox"
              name="fries"
              checked={extras.fries}
              onChange={handleExtraChange}
            />
            Frites {isPromoActive ? "(offertes)" : "(+$3.00)"}
          </label>
          <label>
            <input
              type="checkbox"
              name="drink"
              checked={extras.drink}
              onChange={handleExtraChange}
            />
            Boisson {isPromoActive ? "(offerte)" : "(choix +$2.50)"}
          </label>

          {extras.drink && (
            <select
              value={drinkChoice}
              onChange={(e) => setDrinkChoice(e.target.value)}
              style={{ marginTop: "4px" }}
            >
              <option value="Coca-Cola">Coca-Cola</option>
              <option value="Pepsi">Pepsi</option>
              <option value="Fanta">Fanta</option>
              <option value="Sprite">Sprite</option>
              <option value="Eau">Eau</option>
            </select>
          )}
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
