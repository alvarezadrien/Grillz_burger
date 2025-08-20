// src/components/Navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleSidebar = () => setIsBurgerOpen((prev) => !prev);

  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (isBurgerOpen) {
      sidebar.classList.add("show");
      overlay.classList.add("show");
    } else {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    }
  }, [isBurgerOpen]);

  const menuItems = [
    { label: "BURGERS", path: "/" },
    { label: "SPÉCIAUX", path: "/speciaux" },
    { label: "JUMBOS", path: "/jumbos" },
    { label: "ENTRÉES", path: "/entrees" },
    { label: "SALADES", path: "/salades" },
    { label: "DESSERTS", path: "/dessert" },
    { label: "BOISSONS", path: "/boissons" },
  ];

  return (
    <>
      <div className="overlay" id="overlay" onClick={toggleSidebar}></div>

      <aside className="sidebar" id="sidebar">
        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`menu-item ${
                activeItem === item.path ? "active" : ""
              }`}
              onClick={() => setActiveItem(item.path)}
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="top-icons">
        {/* Panier */}
        <Link to="/panier" className="icon cart-icon" title="Panier">
          <FaShoppingCart size={22} color="#fff" />
        </Link>

        {/* Burger menu */}
        <div className="icon" onClick={toggleSidebar} title="Menu">
          <div className={`burger-icon ${isBurgerOpen ? "open" : ""}`}>
            <span className="burger-bar top"></span>
            <span className="burger-bar middle"></span>
            <span className="burger-bar bottom"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
