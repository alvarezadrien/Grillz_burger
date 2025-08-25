import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Salades.css";

import CaesarSaladImg from "../../../assets/images/salade.jpg";
import GreekSaladImg from "../../../assets/images/salade.jpg";
import QuinoaSaladImg from "../../../assets/images/salade.jpg";
import heroSalad from "../../../assets/images/salade.jpg";

const saladsData = [
  {
    id: 1,
    name: "Salade César",
    desc: "Laitue romaine, poulet grillé, croûtons, parmesan et notre vinaigrette César crémeuse.",
    price: 8.99,
    img: CaesarSaladImg,
  },
  {
    id: 2,
    name: "Salade Grecque",
    desc: "Tomates, concombres, oignons rouges, olives Kalamata et feta, arrosés d'huile d'olive.",
    price: 9.5,
    img: GreekSaladImg,
  },
  {
    id: 3,
    name: "Salade de Quinoa",
    desc: "Quinoa, avocat, maïs, haricots noirs, poivrons et une vinaigrette légère au citron vert.",
    price: 10.25,
    img: QuinoaSaladImg,
  },
];

const Salades = () => {
  const navigate = useNavigate();

  const [quantityMap, setQuantityMap] = useState(
    saladsData.reduce((acc, s) => {
      acc[s.id] = 1;
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
      .querySelectorAll(".salad-reveal")
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

  const calculatePrice = (salad) => {
    return (salad.price * quantityMap[salad.id]).toFixed(2);
  };

  const handleAddToCart = (salad) => {
    const order = {
      product: salad.name,
      quantity: quantityMap[salad.id],
      totalPrice: calculatePrice(salad),
    };
    console.log("Salade ajoutée au panier :", order);
    alert(`${salad.name} ajoutée au panier !`);
  };

  const handleView = () => {
    navigate("/produit_salade");
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <header className="salad-hero-wrap" id="salad-hero">
        <div
          className="salad-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroSalad})` }}
        ></div>
        <div className="salad-hero-overlay" aria-hidden="true"></div>

        <main className="salad-main-content">
          <h1 className="salad-titre-page">Nos Salades</h1>
          <section className="salad-hero-section">
            <p className="salad-hero-text salad-reveal">
              Des salades fraîches, croquantes et pleines de saveurs pour un
              repas sain et délicieux.
            </p>
          </section>
        </main>
      </header>

      {/* ====== LISTE DES SALADES ====== */}
      <section id="salads" className="salad-reveal salad-section">
        <h2 className="salad-section-title">Notre Sélection</h2>
        <p className="salad-section-subtitle">
          Découvrez nos créations légères et gourmandes.
        </p>

        <div className="salad-products-grid">
          {saladsData.map((salad) => (
            <article className="salad-product-card" key={salad.id}>
              <img
                className="salad-product-img"
                src={salad.img}
                alt={salad.name}
              />
              <div className="salad-product-header">
                <h3 className="salad-product-title">{salad.name}</h3>
              </div>
              <p className="salad-product-desc">{salad.desc}</p>
              <div className="salad-quantity">
                <button onClick={() => handleQuantityChange(salad.id, "minus")}>
                  -
                </button>
                <input type="number" value={quantityMap[salad.id]} readOnly />
                <button onClick={() => handleQuantityChange(salad.id, "plus")}>
                  +
                </button>
              </div>
              <p className="salad-product-price">
                <span>${calculatePrice(salad)}</span>
              </p>
              <div className="salad-product-buttons">
                <button
                  className="salad-btn-add"
                  onClick={() => handleAddToCart(salad)}
                >
                  Ajouter au panier
                </button>
                <button className="salad-btn-view" onClick={handleView}>
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

export default Salades;
