import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./Components/Pages/HomePage/Home";
import Boissons from "./Components/Pages/Boissons/Boissons";
import ProduitBurger from "./Components/Pages/ProduitBurger/ProduitBurger";
import Dessert from "./Components/Pages/Dessert/Dessert";
import Panier from "./Components/Pages/Panier/Panier";
import Burger from "./Components/Pages/Burger/Burger";

// Import de la navbar et du footer
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boissons" element={<Boissons />} />
        <Route path="/produit_burger" element={<ProduitBurger />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/burger" element={<Burger />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
