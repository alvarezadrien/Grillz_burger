import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Panier.css";
import { CartContext } from "../../context/CartContext";

const Panier = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, calculateTotal } =
    useContext(CartContext);

  const handleCheckout = () => {
    alert(
      "🎉 Votre moment gourmand est en route ! Merci pour votre commande (simulée)."
    );
    clearCart();
    navigate("/");
  };

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div className="panier-page">
      <header className="panier-header">
        <h1>Votre Sélection Pâtissière 🛒</h1>
        <p>
          Il est temps de finaliser votre commande et de vous faire plaisir.
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est vide... Vite, un petit plaisir ! 😢</p>
          <button className="btn-primary" onClick={handleContinue}>
            Continuer mes achats
          </button>
        </div>
      ) : (
        <section className="panier-content">
          {/* Section Gauche : Détails des articles */}
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.product} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.product}</h3>
                  {item.extras && item.extras.length > 0 && (
                    <p className="cart-desc">
                      Extras : {item.extras.join(", ")}
                    </p>
                  )}
                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item.id, "minus")}>
                      –
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, "plus")}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  <p>{(item.price * item.quantity).toFixed(2)} €</p>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Retirer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Section Droite : Résumé de la commande */}
          <aside className="cart-summary">
            <h2>Récapitulatif</h2>
            <p>
              Total de la commande : <strong>{calculateTotal()} €</strong>
            </p>
            <button
              className="btn-checkout btn-primary"
              onClick={handleCheckout}
            >
              Valider et Payer
            </button>
            <button
              className="btn-clear btn-secondary"
              onClick={handleContinue}
            >
              Recommencer la sélection
            </button>
          </aside>
        </section>
      )}
    </div>
  );
};

export default Panier;
