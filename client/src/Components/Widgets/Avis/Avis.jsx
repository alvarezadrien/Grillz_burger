// components/Avis.jsx
import React, { useEffect } from "react";
import "./Avis.css";

const Avis = () => {
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

    // ====== PAUSE CARROUSEL si l'utilisateur n'est pas sur l'onglet ======
    const track = document.getElementById("track");
    const handleVisibilityChange = () => {
      if (track)
        track.style.animationPlayState = document.hidden ? "paused" : "running";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section id="temoignages" className="testimonials reveal">
      <h2 className="section-title">Ce que disent nos clients</h2>
      <p className="section-subtitle">
        Merci pour votre amour, c’est lui qui assaisonne nos burgers 💚
      </p>

      <div className="carousel" aria-label="Témoignages clients">
        <div className="track" id="track">
          <div className="card">
            <div className="stars">★★★★★</div>
            “Le meilleur burger de la ville, point. La sauce Grillz est
            incroyable.”
            <div className="author">— Alex, Bruxelles</div>
          </div>
          <div className="card">
            <div className="stars">★★★★★</div>
            “Service rapide, viande juteuse, pain brioché parfait. Rien à
            redire.”
            <div className="author">— Lina, Liège</div>
          </div>
          <div className="card">
            <div className="stars">★★★★☆</div>
            “Le Jumbo Max porte bien son nom. Préparez-vous 😅”
            <div className="author">— Hugo, Namur</div>
          </div>
          <div className="card">
            <div className="stars">★★★★★</div>
            “Ambiance canon, design moderne et burgers de folie.”
            <div className="author">— Sarah, Charleroi</div>
          </div>

          {/* Copie pour animation continue */}
          <div className="card">
            <div className="stars">★★★★★</div>
            “Le meilleur burger de la ville, point. La sauce Grillz est
            incroyable.”
            <div className="author">— Alex, Bruxelles</div>
          </div>
          <div className="card">
            <div className="stars">★★★★★</div>
            “Service rapide, viande juteuse, pain brioché parfait. Rien à
            redire.”
            <div className="author">— Lina, Liège</div>
          </div>
          <div className="card">
            <div className="stars">★★★★☆</div>
            “Le Jumbo Max porte bien son nom. Préparez-vous 😅”
            <div className="author">— Hugo, Namur</div>
          </div>
          <div className="card">
            <div className="stars">★★★★★</div>
            “Ambiance canon, design moderne et burgers de folie.”
            <div className="author">— Sarah, Charleroi</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Avis;
