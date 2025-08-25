import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProduitBurger.css";
import { CartContext } from "../../context/CartContext";

const ProduitBurger = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [burger, setBurger] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState({});

  useEffect(() => {
    fetch(`https://grillzburger.onrender.com/api/burgers/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Burger non trouvé");
        return res.json();
      })
      .then((data) => {
        setBurger(data);
        const initialExtras = {};
        data.additions?.forEach((extra) => (initialExtras[extra.name] = false));
        setExtras(initialExtras);
      })
      .catch(() => navigate("/burger"));
  }, [id, navigate]);

  const handleExtraChange = (name) => {
    setExtras((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "minus" ? Math.max(1, prev - 1) : prev + 1
    );
  };

  const calculatePrice = () => {
    if (!burger) return 0;
    let extrasPrice = 0;
    burger.additions?.forEach((extra) => {
      if (extras[extra.name]) extrasPrice += extra.price || 0;
    });
    return ((burger.price + extrasPrice) * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    const order = {
      id: burger._id,
      product: burger.name,
      quantity,
      extras: Object.keys(extras).filter((key) => extras[key]),
      totalPrice: calculatePrice(),
      image: burger.image,
    };
    addToCart(order);
    alert(`${burger.name} ajouté au panier !`);
  };

  if (!burger) return <p>Chargement...</p>;

  return (
    <div className="produit-container">
      <div className="produit-main">
        <div className="produit-img">
          <img src={burger.image} alt={burger.name} />
        </div>

        {burger.additions?.length > 0 && (
          <div className="extras-container">
            <h3>Extras disponibles</h3>
            <div className="extras-list">
              {burger.additions.map((extra) => (
                <div
                  key={extra.name}
                  className={`extra-item ${extras[extra.name] ? "active" : ""}`}
                  onClick={() => handleExtraChange(extra.name)}
                >
                  <span>{extra.name}</span>
                  <span>+${extra.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="produit-details">
        <h1>{burger.name}</h1>
        <p>{burger.description}</p>

        <div className="quantity">
          <label>Quantité :</label>
          <button onClick={() => handleQuantityChange("minus")}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange("plus")}>+</button>
        </div>

        <div className="total">
          <h2>Total : ${calculatePrice()}</h2>
        </div>

        <button className="btn-add" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProduitBurger;
