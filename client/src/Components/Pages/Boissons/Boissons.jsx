import React, { useEffect } from "react";
import "./Boissons.css";
import heroBoisson from "../../../assets/images/img_boissons.png"; // Import local

const Boissons = () => {
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

  return (
    <>
      {/* ====== HERO ====== */}
      <header className="hero-wrap" id="boissons-hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-overlay" aria-hidden="true"></div>

        <main className="main-content">
          <h1 className="titre_page">Nos Boissons</h1>

          <section className="hero-section">
            <div className="hero-img-container">
              <img
                src={heroBoisson}
                alt="Verre de boisson fraîche colorée"
                className="hero-image"
              />
            </div>
            <p className="hero-text reveal">
              Rafraîchissez-vous avec notre sélection de boissons artisanales et
              classiques. Que ce soit pour accompagner votre burger ou pour vous
              désaltérer après une journée bien remplie !
            </p>
          </section>
        </main>
      </header>

      {/* ====== LISTE DES BOISSONS ====== */}
      <section id="boissons" className="reveal section">
        <h2 className="section-title">Sélection de Boissons</h2>
        <p className="section-subtitle">
          Choisissez parmi nos boissons fraîches, sodas, jus et cocktails
          maison.
        </p>

        <div className="products-grid">
          <article className="product-card">
            <img
              className="product-img"
              src="https://images.unsplash.com/photo-1580910051070-58f7024f1034?q=80&w=1200&auto=format&fit=crop"
              alt="Soda Classique"
            />
            <div className="product-header">
              <h3 className="product-title">Soda Classique</h3>
              <span className="badge">Frais</span>
            </div>
            <p className="product-desc">
              Un soda pétillant, idéal pour accompagner votre burger préféré.
            </p>
            <a href="#" className="btn">
              <i className="fa-solid fa-basket-shopping"></i> Commander
            </a>
          </article>

          <article className="product-card">
            <img
              className="product-img"
              src="https://images.unsplash.com/photo-1602209177880-5f1737e8f142?q=80&w=1200&auto=format&fit=crop"
              alt="Jus de fruits frais"
            />
            <div className="product-header">
              <h3 className="product-title">Jus de Fruits Frais</h3>
              <span className="badge">Naturel</span>
            </div>
            <p className="product-desc">
              Mélange de fruits frais pressés sur place pour un goût
              authentique.
            </p>
            <a href="#" className="btn">
              <i className="fa-solid fa-basket-shopping"></i> Commander
            </a>
          </article>

          <article className="product-card">
            <img
              className="product-img"
              src="https://images.unsplash.com/photo-1579548483259-2e06173004b3?q=80&w=1200&auto=format&fit=crop"
              alt="Cocktail maison"
            />
            <div className="product-header">
              <h3 className="product-title">Cocktail Maison</h3>
              <span className="badge">Signature</span>
            </div>
            <p className="product-desc">
              Notre cocktail maison, avec un mélange unique de saveurs
              rafraîchissantes.
            </p>
            <a href="#" className="btn">
              <i className="fa-solid fa-basket-shopping"></i> Commander
            </a>
          </article>
        </div>
      </section>
    </>
  );
};

export default Boissons;
