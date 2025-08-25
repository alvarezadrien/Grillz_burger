import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./Components/Pages/HomePage/Home";
import Boissons from "./Components/Pages/Boissons/Boissons";
import ProduitBurger from "./Components/Pages/ProduitBurger/ProduitBurger";
import Dessert from "./Components/Pages/Dessert/Dessert";
import Panier from "./Components/Pages/Panier/Panier";
import Burger from "./Components/Pages/Burger/Burger";
import Salades from "./Components/Pages/Salades/Salades";

// Import de la navbar et du footer backoffice
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import BackOffice from "./Components/BackOffice/BackOffice -";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boissons" element={<Boissons />} />
        <Route path="/produit_burger/:id" element={<ProduitBurger />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/burger" element={<Burger />} />
        <Route path="/salades" element={<Salades />} />
        <Route path="/backoffice" element={<BackOffice />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
