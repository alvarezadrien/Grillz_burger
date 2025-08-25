import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Burger.css";

import heroBurger from "../../../assets/images/Jumbo_max.png";

const Burger = () => {
  const navigate = useNavigate();
  const [burgers, setBurgers] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});

  // 🔹 Charger les burgers depuis l'API
  useEffect(() => {
    fetch("https://grillzburger.onrender.com/api/burgers")
      .then((res) => res.json())
      .then((data) => {
        setBurgers(data);
        // Initialiser les quantités à 1
        const qtyMap = {};
        data.forEach((b) => (qtyMap[b._id] = 1));
        setQuantityMap(qtyMap);
      })
      .catch((err) => console.error("Erreur récupération burgers :", err));
  }, []);

  // 🔹 Animation Intersection Observer pour les cartes
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
      .querySelectorAll(".burger-reveal")
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

  const calculatePrice = (burger) => {
    return (burger.price * quantityMap[burger._id]).toFixed(2);
  };

  const handleAddToCart = (burger) => {
    const order = {
      product: burger.name,
      quantity: quantityMap[burger._id],
      totalPrice: calculatePrice(burger),
    };
    console.log("Burger ajouté au panier :", order);
    alert(`${burger.name} ajouté au panier !`);
  };

  const handleView = () => {
    navigate("/produit_burger");
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <header className="burger-hero-wrap" id="burger-hero">
        <div
          className="burger-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroBurger})` }}
        ></div>
        <div className="burger-hero-overlay" aria-hidden="true"></div>

        <main className="burger-main-content">
          <h1 className="burger-titre-page">Nos Burgers</h1>
          <section className="burger-hero-section">
            <p className="burger-hero-text burger-reveal">
              Découvrez nos burgers artisanaux, préparés avec des ingrédients
              frais et de qualité !
            </p>
          </section>
        </main>
      </header>

      {/* ====== LISTE DES BURGERS ====== */}
      <section id="burgers" className="burger-section burger-reveal">
        <h2 className="burger-section-title">Notre Sélection</h2>
        <p className="burger-section-subtitle">
          Des recettes originales et des classiques revisités pour tous les
          palais.
        </p>

        <div className="burger-products-grid">
          {burgers.map((burger) => (
            <article
              className="burger-product-card burger-reveal"
              key={burger._id}
            >
              <img
                className="burger-product-img"
                src={burger.img || "/default-burger.png"}
                alt={burger.name}
              />
              <div className="burger-product-header">
                <h3 className="burger-product-title">{burger.name}</h3>
              </div>
              <p className="burger-product-desc">{burger.description}</p>

              <div className="burger-quantity">
                <button
                  onClick={() => handleQuantityChange(burger._id, "minus")}
                >
                  -
                </button>
                <input type="number" value={quantityMap[burger._id]} readOnly />
                <button
                  onClick={() => handleQuantityChange(burger._id, "plus")}
                >
                  +
                </button>
              </div>

              <p className="burger-product-price">
                <span>${calculatePrice(burger)}</span>
              </p>

              <div className="burger-product-buttons">
                <button
                  className="burger-btn-add"
                  onClick={() => handleAddToCart(burger)}
                >
                  Ajouter au panier
                </button>
                <button className="burger-btn-view" onClick={handleView}>
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

export default Burger;
