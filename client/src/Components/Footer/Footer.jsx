import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div>
          <div className="footer-title">Grillz Burger</div>
          <p className="footer-muted">
            Des burgers qui marquent l’histoire, préparés avec passion et servis
            avec le smile.
          </p>
          <div className="socials">
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div>
          <div className="footer-title">Nous trouver</div>
          <p className="footer-muted">
            📍 Rue du Goût 123, 1000 Bruxelles
            <br />
            ☎️ 02 123 45 67
            <br />
            🕒 11:00 — 23:00
          </p>
        </div>

        <div>
          <div className="footer-title">Contact</div>
          <p className="footer-muted">
            hello@Grillz-burger.be
            <br />
            Jobs : jobs@Grillz-burger.be
          </p>
        </div>
      </div>
      <p
        className="footer-muted"
        style={{ textAlign: "center", marginTop: "18px" }}
      >
        © 2025 Grillz Burger — Tous droits réservés
      </p>
    </footer>
  );
};

export default Footer;
