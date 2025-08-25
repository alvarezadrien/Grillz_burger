import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Burger.css";

import ClassicBurgerImg from "../../../assets/images/Classic_grillz.png";
import VeggieBurgerImg from "../../../assets/images/Special_bbq.avif";
import BbqBurgerImg from "../../../assets/images/Jumbo_max.png";
import heroBurger from "../../../assets/images/Jumbo_max.png";

const burgersData = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    desc: "Un classique indémodable avec steak de bœuf, cheddar fondant, laitue, tomate et cornichons.",
    price: 9.99,
    img: ClassicBurgerImg,
  },
  {
    id: 2,
    name: "Smoky BBQ Burger",
    desc: "Galette de bœuf grillée, sauce barbecue fumée, oignons croustillants et bacon grillé.",
    price: 11.5,
    img: BbqBurgerImg,
  },
  {
    id: 3,
    name: "Veggie Delight",
    desc: "Galette de légumes savoureuse avec avocat, oignons caramélisés et notre sauce spéciale.",
    price: 10.99,
    img: VeggieBurgerImg,
  },
];

const Burger = () => {
  const navigate = useNavigate();

  const [quantityMap, setQuantityMap] = useState(
    burgersData.reduce((acc, b) => {
      acc[b.id] = 1;
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
    return (burger.price * quantityMap[burger.id]).toFixed(2);
  };

  const handleAddToCart = (burger) => {
    const order = {
      product: burger.name,
      quantity: quantityMap[burger.id],
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
      <section id="burgers" className="burger-reveal burger-section">
        <h2 className="burger-section-title">Notre Sélection</h2>
        <p className="burger-section-subtitle">
          Des recettes originales et des classiques revisités pour tous les
          palais.
        </p>

        <div className="burger-products-grid">
          {burgersData.map((burger) => (
            <article className="burger-product-card" key={burger.id}>
              <img
                className="burger-product-img"
                src={burger.img}
                alt={burger.name}
              />
              <div className="burger-product-header">
                <h3 className="burger-product-title">{burger.name}</h3>
              </div>
              <p className="burger-product-desc">{burger.desc}</p>
              <div className="burger-quantity">
                <button
                  onClick={() => handleQuantityChange(burger.id, "minus")}
                >
                  -
                </button>
                <input type="number" value={quantityMap[burger.id]} readOnly />
                <button onClick={() => handleQuantityChange(burger.id, "plus")}>
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
