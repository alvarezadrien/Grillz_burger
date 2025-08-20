import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    const burgerIcon = document.getElementById("burger-menu-icon");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    const toggleSidebar = () => {
      sidebar.classList.toggle("show");
      overlay.classList.toggle("show");
    };

    burgerIcon.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);

    // Cleanup
    return () => {
      burgerIcon.removeEventListener("click", toggleSidebar);
      overlay.removeEventListener("click", toggleSidebar);
    };
  }, []);

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
      <div className="overlay" id="overlay"></div>

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
        <div className="icon" title="Rechercher">
          <i className="fas fa-search"></i>
        </div>
        <div className="icon" id="burger-menu-icon" title="Menu">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
