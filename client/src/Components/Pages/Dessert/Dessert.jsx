import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dessert.css";

import ChocolateCakeImg from "../../../assets/images/chocolate_cake.png";
import IceCreamImg from "../../../assets/images/glace_coup.png";
import TiramisuImg from "../../../assets/images/tiramisu.png";
import heroDessert from "../../../assets/images/hero_dessert.png"; // Hero image

const dessertsData = [
  {
    id: 1,
    name: "Chocolate Cake",
    desc: "Gâteau au chocolat fondant avec nappage au chocolat noir.",
    price: 5.99,
    img: ChocolateCakeImg,
    promo: true,
  },
  {
    id: 2,
    name: "Vanilla Ice Cream",
    desc: "Glace à la vanille de Madagascar, crème onctueuse.",
    price: 3.99,
    img: IceCreamImg,
    promo: false,
  },
  {
    id: 3,
    name: "Tiramisu",
    desc: "Dessert italien classique avec café et mascarpone.",
    price: 6.5,
    img: TiramisuImg,
    promo: false,
  },
];

const Dessert = () => {
  const navigate = useNavigate();

  const [quantityMap, setQuantityMap] = useState(
    dessertsData.reduce((acc, d) => {
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
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }, []);

  const handleQuantityChange = (id, type) => {
    setQuantityMap((prev) => {
      const newQty = { ...prev };
      if (type === "minus") newQty[id] = Math.max(1, newQty[id] - 1);
      else newQty[id] += 1;
      return newQty;
    });
  };

  const calculatePrice = (dessert) => {
    let price = dessert.price;
    if (dessert.promo) price *= 0.75;
    return (price * quantityMap[dessert.id]).toFixed(2);
  };

  const handleAddToCart = (dessert) => {
    const order = {
      product: dessert.name,
      quantity: quantityMap[dessert.id],
      totalPrice: calculatePrice(dessert),
    };
    console.log("Dessert ajouté au panier :", order);
    alert(`${dessert.name} ajouté au panier !`);
  };

  const handleView = () => {
    navigate("/produit_dessert");
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <header className="hero-wrap" id="dessert-hero">
        <div
          className="hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroDessert})` }}
        ></div>
        <div className="hero-overlay" aria-hidden="true"></div>

        <main className="main-content">
          <h1 className="titre_page">Nos Desserts</h1>

          <section className="hero-section">
            <p className="hero-text reveal">
              Découvrez nos douceurs sucrées, parfaites pour terminer votre
              repas !
            </p>
          </section>
        </main>
      </header>

      {/* ====== LISTE DES DESSERTS ====== */}
      <section id="desserts" className="reveal section">
        <h2 className="section-title">Sélection du jour</h2>
        <p className="section-subtitle">
          Des desserts délicieux et gourmands pour tous les goûts.
        </p>

        <div className="products-grid">
          {dessertsData.map((dessert) => (
            <article className="product-card" key={dessert.id}>
              {dessert.promo && <div className="dessert-badge">-25% Promo</div>}
              <img
                className="product-img"
                src={dessert.img}
                alt={dessert.name}
              />
              <div className="product-header">
                <h3 className="product-title">{dessert.name}</h3>
              </div>
              <p className="product-desc">{dessert.desc}</p>
              <div className="quantity">
                <button
                  onClick={() => handleQuantityChange(dessert.id, "minus")}
                >
                  -
                </button>
                <input type="number" value={quantityMap[dessert.id]} readOnly />
                <button
                  onClick={() => handleQuantityChange(dessert.id, "plus")}
                >
                  +
                </button>
              </div>
              <p className="product-price">
                {dessert.promo ? (
                  <>
                    <span className="old-price">
                      ${dessert.price.toFixed(2)}
                    </span>{" "}
                    <span className="promo-price">
                      ${calculatePrice(dessert)}
                    </span>
                  </>
                ) : (
                  <span>${calculatePrice(dessert)}</span>
                )}
              </p>
              <div className="product-buttons">
                <button
                  className="btn-add"
                  onClick={() => handleAddToCart(dessert)}
                >
                  Ajouter au panier
                </button>
                <button className="btn-view" onClick={handleView}>
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

export default Dessert;
