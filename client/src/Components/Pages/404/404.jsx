import React from "react";
import { useNavigate } from "react-router-dom";
import "./404.css";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oups ! La page a fondu.</h2>
        <p className="not-found-text">
          On dirait que la page que vous cherchez a disparu dans un de nos
          burgers. Ne vous inquiétez pas, vous pouvez retourner au menu pour
          trouver quelque chose de délicieux.
        </p>
        <div className="burgers">
          <div className="burger big"></div>
          <div className="burger small happy"></div>
        </div>
        <button className="return-button" onClick={() => navigate("/")}>
          Retourner au menu
        </button>
      </div>
    </div>
  );
};

export default Page404;
