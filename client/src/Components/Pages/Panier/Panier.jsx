import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Panier.css";

const Panier = () => {
  const navigate = useNavigate();

  // --- Données fictives ajustées (pour un feeling plus premium) ---
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Tartelette Fraise & Basilic",
      desc: "Fine pâte sablée, crème légère au mascarpone et fraises de saison 🍓",
      price: 6.5,
      quantity: 2,
      img: "https://source.unsplash.com/100x100/?gourmet,tart,strawberry",
    },
    {
      id: 2,
      name: "Paris-Brest Signature",
      desc: "Couronne de pâte à chou, praliné noisette croustillant et crème mousseline 🌰",
      price: 5.8,
      quantity: 1,
      img: "https://source.unsplash.com/100x100/?paris-brest,patisserie",
    },
    {
      id: 3,
      name: "Box de 6 Macarons",
      desc: "Notre sélection du jour : Vanille de Madagascar, Framboise et Pistache 🌸",
      price: 18.0,
      quantity: 1,
      img: "https://source.unsplash.com/100x100/?macarons,luxury",
    },
  ]);

  // --- Fonctions (inchangées car elles sont fonctionnelles) ---
  const updateQuantity = (id, action) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "plus"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    alert(
      "🎉 Votre moment gourmand est en route ! Merci pour votre commande (simulée)."
    );
    clearCart();
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
          <button
            className="btn-primary" // Classe ajustée
            onClick={() => navigate("/desserts")}
          >
            Découvrir nos créations
          </button>
        </div>
      ) : (
        <section className="panier-content">
          {/* Section Gauche : Détails des articles */}
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="cart-desc">{item.desc}</p>
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
            <button className="btn-clear btn-secondary" onClick={clearCart}>
              Recommencer la sélection
            </button>
          </aside>
        </section>
      )}
    </div>
  );
};

export default Panier;
