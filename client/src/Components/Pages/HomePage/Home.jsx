import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Import des burgers img
import ClassicGrillz from "../../../assets/images/Classic_grillz.png";
import SpecialBBQ from "../../../assets/images/Special_bbq.avif";
import JumboMax from "../../../assets/images/Jumbo_max.png";

// Nouveau des widgets
import Avis from "../../Widgets/Avis/Avis";

const burgersData = [
  {
    id: 1,
    name: "Classic Grillz",
    desc: "Steak de bœuf 100% pur, cheddar américain, pickles, oignons, sauce Grillz. Simple, efficace, culte.",
    price: 9.99,
    img: ClassicGrillz,
    badge: "Best-seller",
  },
  {
    id: 2,
    name: "Spécial BBQ",
    desc: "Viande grillée, sauce BBQ signature, oignons caramélisés, double fromage fondant.",
    price: 11.5,
    img: SpecialBBQ,
    badge: "Fumé",
  },
  {
    id: 3,
    name: "Jumbo Max",
    desc: "Double steak, double cheddar, bacon croustillant, sauce secrète. Pour les appétits légendaires.",
    price: 14.99,
    img: JumboMax,
    badge: "XXL",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [quantityMap, setQuantityMap] = useState(
    burgersData.reduce((acc, b) => {
      acc[b.id] = 1;
      return acc;
    }, {})
  );

  useEffect(() => {
    // ====== RÉVÉLATION AU SCROLL ======
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

  const handlePromoClick = () => {
    const now = new Date();
    const hour = now.getHours();
    const isPromoTime = hour >= 11 && hour < 14;
    navigate("/produit_burger" + (isPromoTime ? "?promo=true" : ""));
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <header className="hero-wrap">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-overlay" aria-hidden="true"></div>

        <main className="main-content">
          <h1 className="titre_page">
            Grillz
            <br />
            Burger
          </h1>

          <section className="hero-section">
            <p className="hero-text">
              Certaines saveurs sont agréables,{" "}
              <strong>d’autres marquent l’histoire</strong>. Si nous sommes
              connus pour quelque chose, c’est bien pour préparer des burgers
              pour les vrais amoureux de viande. 100% bœuf, fromage américain,
              bacon, tomate, salade et notre sauce maison Grillz.
            </p>
            <div>
              <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Grillz Burger signature"
                className="hero-image"
              />
            </div>
          </section>

          <p className="tagline">UN GOÛT DE CHEZ SOI</p>
        </main>
      </header>

      {/* ====== PRODUITS ====== */}
      <section className="reveal">
        <h2 className="section-title">Nos Burgers Préférés</h2>
        <p className="section-subtitle">
          Des recettes iconiques, des ingrédients triés sur le volet, et ce
          petit twist{" "}
          <strong style={{ color: "var(--lime-green)" }}>Grillz</strong> qui
          fait la différence.
        </p>

        <div className="products-grid">
          {burgersData.map((burger) => (
            <article className="product-card" key={burger.id}>
              <img className="product-img" src={burger.img} alt={burger.name} />
              <div className="product-header">
                <h3 className="product-title">{burger.name}</h3>
                <span className="badge">{burger.badge}</span>
              </div>
              <p className="product-desc">{burger.desc}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
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

              <p className="product-price">${calculatePrice(burger)}</p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn" onClick={() => handleAddToCart(burger)}>
                  <i className="fa-solid fa-basket-shopping"></i> Commander
                </button>
                <button className="btn" onClick={handleView}>
                  <i className="fa-solid fa-eye"></i> Voir
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bandeau promo animé */}
        <div className="promo reveal" style={{ marginTop: "28px" }}>
          <div className="promo-anim" aria-hidden="true"></div>
          <div className="promo-inner">
            <div>
              <h3>
                🔥 Offre du moment : Menu{" "}
                <span style={{ color: "var(--lime-green)" }}>Classic</span> +
                boisson à <strong>-25%</strong>
              </h3>
              <p>
                Disponible tous les jours de 11h à 14h. À consommer sur place ou
                à emporter.
              </p>
            </div>
            <button className="btn" onClick={handlePromoClick}>
              <i className="fa-solid fa-ticket"></i> Profiter
            </button>
          </div>
        </div>
      </section>

      <Avis />
    </>
  );
};

export default Home;
