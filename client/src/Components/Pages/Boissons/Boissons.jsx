import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Boissons.css";

import ColaImg from "../../../assets/images/drinks.jpg";
import OrangeJuiceImg from "../../../assets/images/drinks.jpg";
import MineralWaterImg from "../../../assets/images/drinks.jpg";
import heroDrink from "../../../assets/images/drinks.jpg";

const drinksData = [
  {
    id: 1,
    name: "Coca-Cola",
    desc: "Boisson rafraîchissante au cola, servie fraîche.",
    price: 2.5,
    img: ColaImg,
  },
  {
    id: 2,
    name: "Jus d'Orange",
    desc: "Pur jus d'orange pressé, sans sucre ajouté.",
    price: 3.0,
    img: OrangeJuiceImg,
  },
  {
    id: 3,
    name: "Eau Minérale",
    desc: "Bouteille d'eau minérale, plate ou pétillante.",
    price: 2.0,
    img: MineralWaterImg,
  },
];

const Boissons = () => {
  const navigate = useNavigate();

  const [quantityMap, setQuantityMap] = useState(
    drinksData.reduce((acc, d) => {
      acc[d.id] = 1;
      return acc;
    }, {})
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll(".drink-reveal")
      .forEach((el) => observer.observe(el));
  }, []);

  const handleQuantityChange = (id, type) => {
    setQuantityMap((prev) => {
      const newQty = { ...prev };
      if (type === "minus") newQty[id] = Math.max(1, newQty[id] - 1);
      else newQty[id] += 1;
      return newQty;
    });
  };

  const calculatePrice = (drink) => {
    return (drink.price * quantityMap[drink.id]).toFixed(2);
  };

  const handleAddToCart = (drink) => {
    const order = {
      product: drink.name,
      quantity: quantityMap[drink.id],
      totalPrice: calculatePrice(drink),
    };
    console.log("Boisson ajoutée au panier :", order);
    alert(`${drink.name} ajoutée au panier !`);
  };

  const handleView = () => {
    navigate("/produit_boisson");
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <header className="drink-hero-wrap" id="drink-hero">
        <div
          className="drink-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroDrink})` }}
        ></div>
        <div className="drink-hero-overlay" aria-hidden="true"></div>

        <main className="drink-main-content">
          <h1 className="drink-titre-page">Nos Boissons</h1>
          <section className="drink-hero-section">
            <p className="drink-hero-text drink-reveal">
              Rafraîchissez-vous avec notre sélection de boissons froides.
            </p>
          </section>
        </main>
      </header>

      {/* ====== LISTE DES BOISSONS ====== */}
      <section id="drinks" className="drink-reveal drink-section">
        <h2 className="drink-section-title">Sélection</h2>
        <p className="drink-section-subtitle">
          Des classiques aux jus de fruits frais, il y a une boisson pour chaque
          soif.
        </p>

        <div className="drink-products-grid">
          {drinksData.map((drink) => (
            <article className="drink-product-card" key={drink.id}>
              <img
                className="drink-product-img"
                src={drink.img}
                alt={drink.name}
              />
              <div className="drink-product-header">
                <h3 className="drink-product-title">{drink.name}</h3>
              </div>
              <p className="drink-product-desc">{drink.desc}</p>
              <div className="drink-quantity">
                <button onClick={() => handleQuantityChange(drink.id, "minus")}>
                  -
                </button>
                <input type="number" value={quantityMap[drink.id]} readOnly />
                <button onClick={() => handleQuantityChange(drink.id, "plus")}>
                  +
                </button>
              </div>
              <p className="drink-product-price">
                <span>${calculatePrice(drink)}</span>
              </p>
              <div className="drink-product-buttons">
                <button
                  className="drink-btn-add"
                  onClick={() => handleAddToCart(drink)}
                >
                  Ajouter au panier
                </button>
                <button className="drink-btn-view" onClick={handleView}>
                  Voir
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Boissons;
