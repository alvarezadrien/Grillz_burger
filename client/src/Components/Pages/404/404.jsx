import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

const Page404 = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Oups ! La page a fondu.</h2>
          <p className="not-found-text">
            On dirait que la page que vous cherchez a disparu dans un de nos
            burgers. Ne vous inquiétez pas, vous pouvez retourner au menu pour
            trouver quelque chose de délicieux.
          </p>
          <img
            src="http://googleusercontent.com/image_generation_content/4"
            alt="Burger vide"
            className="not-found-image empty-burger"
          />
          <Link to="/" className="not-found-button">
            Retourner au menu
          </Link>
          <img
            src="http://googleusercontent.com/image_generation_content/3"
            alt="Burger souriant"
            className="not-found-image happy-burger"
          />
        </div>
      </div>
    </div>
  );
};

export default Page404;
