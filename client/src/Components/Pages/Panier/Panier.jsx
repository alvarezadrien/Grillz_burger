// src/pages/Panier.jsx
import React, { useState, useEffect } from "react";
import "./Panier.css";

const Panier = () => {
  // Données fictives pour tester
  const [cartItems, setCartItems] = useState([
    {
      product: "Classic Grillz",
      quantity: 2,
      extras: ["Fromage", "Bacon"],
      drinkChoice: "Coca-Cola",
      basePrice: 9.99,
      extrasPrice: 3.5, // fromage + bacon
      totalPrice: ((9.99 + 3.5) * 2).toFixed(2),
    },
    {
      product: "Veggie Delight",
      quantity: 1,
      extras: ["Salade", "Tomates", "Oignons"],
      drinkChoice: "Sprite",
      basePrice: 8.5,
      extrasPrice: 2.5,
      totalPrice: (8.5 + 2.5).toFixed(2),
    },
    {
      product: "Double Bacon Burger",
      quantity: 3,
      extras: ["Extra Burger", "Frites", "Boisson"],
      drinkChoice: "Pepsi",
      basePrice: 11.99,
      extrasPrice: 8.0,
      totalPrice: ((11.99 + 8.0) * 3).toFixed(2),
    },
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + Number(item.totalPrice),
      0
    );
    setTotal(newTotal.toFixed(2));
  }, [cartItems]);

  const handleQuantityChange = (index, type) => {
    setCartItems((prev) => {
      const newCart = [...prev];
      if (type === "minus") {
        newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
      } else {
        newCart[index].quantity += 1;
      }
      newCart[index].totalPrice = (
        (newCart[index].basePrice + (newCart[index].extrasPrice || 0)) *
        newCart[index].quantity
      ).toFixed(2);
      return newCart;
    });
  };

  const handleRemove = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="panier-container">
      <h1>Mon Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="panier-items">
            {cartItems.map((item, index) => (
              <div key={index} className="panier-item">
                <div className="item-info">
                  <h2>{item.product}</h2>
                  {item.extras && item.extras.length > 0 && (
                    <p>
                      Extras: {item.extras.join(", ")}
                      {item.drinkChoice ? ` (${item.drinkChoice})` : ""}
                    </p>
                  )}
                </div>
                <div className="item-quantity">
                  <button onClick={() => handleQuantityChange(index, "minus")}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, "plus")}>
                    +
                  </button>
                </div>
                <div className="item-price">${item.totalPrice}</div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(index)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <div className="panier-total">
            <h2>Total: ${total}</h2>
            <button className="btn-checkout">Passer à la caisse</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;
