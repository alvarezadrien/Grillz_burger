import React, { useState, useEffect } from "react";
import "./BackOffice.css";

// Données fictives pour commandes et utilisateurs
const COMMANDES_DATA = [
  { id: 101, customer: "Jean Dupont", status: "En cours", total: 24.98 },
  { id: 102, customer: "Marie Leclerc", status: "Terminée", total: 15.49 },
  { id: 103, customer: "Thomas Martin", status: "Annulée", total: 12.0 },
];

const UTILISATEURS_DATA = [
  { id: 201, name: "Admin", email: "admin@resto.com", role: "Administrateur" },
  { id: 202, name: "Utilisateur 1", email: "user1@email.com", role: "Client" },
];

const BackOffice = () => {
  const [activeTab, setActiveTab] = useState("produits");
  const [produits, setProduits] = useState([]);
  const [commandes, setCommandes] = useState(COMMANDES_DATA);
  const [utilisateurs, setUtilisateurs] = useState(UTILISATEURS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    ingredients: [],
    allergens: [],
    additions: [],
    included: [],
    price: "",
    image: "",
    spiciness: 0,
    tags: [],
    featured: false,
    stock: false, // booléen
  });

  // Reset form si modal fermé
  useEffect(() => {
    if (!isModalOpen) {
      setFormData({
        name: "",
        category: "",
        description: "",
        ingredients: [],
        allergens: [],
        additions: [],
        included: [],
        price: "",
        image: "",
        spiciness: 0,
        tags: [],
        featured: false,
        stock: false,
      });
      setCurrentProduct(null);
    }
  }, [isModalOpen]);

  // URL API depuis .env
  const API_URL =
    import.meta.env.VITE_API_URL || "https://grillzburger.onrender.com";

  // --- API Produits ---
  const fetchProduits = async () => {
    try {
      const res = await fetch(`${API_URL}/api/burgers`);
      const data = await res.json();
      setProduits(data);
    } catch (err) {
      console.error("Erreur chargement produits:", err);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      price: parseFloat(formData.price),
      stock: formData.stock ? 1 : 0,
      spiciness: parseInt(formData.spiciness, 10),
      additions: formData.additions.map((add) => ({
        name: add.name,
        price: parseFloat(add.price),
      })),
    };

    try {
      if (currentProduct) {
        await fetch(`${API_URL}/api/burgers/${currentProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        });
      } else {
        await fetch(`${API_URL}/api/burgers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        });
      }
      fetchProduits();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erreur ajout/modif produit:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?"))
      return;
    try {
      await fetch(`${API_URL}/api/burgers/${id}`, {
        method: "DELETE",
      });
      fetchProduits();
    } catch (err) {
      console.error("Erreur suppression produit:", err);
    }
  };

  const handleOpenModal = (product = null) => {
    setIsModalOpen(true);
    setCurrentProduct(product);
    if (product)
      setFormData({
        ...product,
        stock: product.stock ? true : false,
      });
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((i) => i.trim()),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "produits":
        return (
          <>
            <div className="dashboard-content-header">
              <h2 className="dashboard-content-title">Gestion des produits</h2>
              <button
                className="dashboard-btn-add"
                onClick={() => handleOpenModal()}
              >
                + Ajouter un produit
              </button>
            </div>
            <div className="dashboard-table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {produits.map((p) => (
                    <tr key={p._id}>
                      <td>{p._id}</td>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.price.toFixed(2)} €</td>
                      <td>{p.stock ? "Oui" : "Non"}</td>
                      <td className="dashboard-actions-cell">
                        <button
                          className="dashboard-btn-edit"
                          onClick={() => handleOpenModal(p)}
                        >
                          Modifier
                        </button>
                        <button
                          className="dashboard-btn-delete"
                          onClick={() => handleDelete(p._id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case "commandes":
        return (
          <>
            <h2 className="dashboard-content-title">Gestion des commandes</h2>
            <div className="dashboard-table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID Commande</th>
                    <th>Client</th>
                    <th>Statut</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {commandes.map((o) => (
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td>{o.customer}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            setCommandes(
                              commandes.map((c) =>
                                c.id === o.id
                                  ? { ...c, status: e.target.value }
                                  : c
                              )
                            )
                          }
                        >
                          <option value="En cours">En cours</option>
                          <option value="Terminée">Terminée</option>
                          <option value="Annulée">Annulée</option>
                        </select>
                      </td>
                      <td>{o.total.toFixed(2)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case "utilisateurs":
        return (
          <>
            <h2 className="dashboard-content-title">
              Gestion des utilisateurs
            </h2>
            <div className="dashboard-table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  {utilisateurs.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) =>
                            setUtilisateurs(
                              utilisateurs.map((user) =>
                                user.id === u.id
                                  ? { ...user, role: e.target.value }
                                  : user
                              )
                            )
                          }
                        >
                          <option value="Administrateur">Administrateur</option>
                          <option value="Client">Client</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h1 className="dashboard-logo">Panneau Admin</h1>
        <nav className="dashboard-nav">
          <ul>
            <li
              className={activeTab === "produits" ? "active" : ""}
              onClick={() => setActiveTab("produits")}
            >
              Produits
            </li>
            <li
              className={activeTab === "commandes" ? "active" : ""}
              onClick={() => setActiveTab("commandes")}
            >
              Commandes
            </li>
            <li
              className={activeTab === "utilisateurs" ? "active" : ""}
              onClick={() => setActiveTab("utilisateurs")}
            >
              Utilisateurs
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">{renderContent()}</main>

      {isModalOpen && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <div className="dashboard-modal-header">
              <h3>
                {currentProduct ? "Modifier le produit" : "Ajouter un produit"}
              </h3>
              <button
                className="dashboard-modal-close"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <div className="dashboard-modal-content">
              <form onSubmit={handleSubmit}>
                <div className="dashboard-form-group">
                  <label>Nom du produit</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dashboard-form-group">
                  <label>Catégorie</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Salades">Salades</option>
                    <option value="Boissons">Boissons</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div className="dashboard-form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dashboard-form-group dashboard-checkbox-group">
                  <input
                    type="checkbox"
                    name="stock"
                    checked={formData.stock}
                    onChange={handleChange}
                  />
                  <label>En stock</label>
                </div>
                <div className="dashboard-form-group">
                  <label>Prix (€)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>
                <div className="dashboard-form-group">
                  <label>Image</label>
                  <div className="dashboard-image-input-group">
                    <input
                      type="text"
                      name="image"
                      placeholder="Coller l'URL de l'image"
                      value={formData.image}
                      onChange={handleChange}
                    />
                    <span className="or-divider">OU</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <div className="dashboard-form-group">
                  <label>Piquant (0-5)</label>
                  <input
                    type="number"
                    name="spiciness"
                    value={formData.spiciness}
                    onChange={handleChange}
                    min="0"
                    max="5"
                  />
                </div>
                <div className="dashboard-form-group">
                  <label>Tags (séparés par virgules)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={handleArrayChange}
                  />
                </div>
                <div className="dashboard-form-group dashboard-checkbox-group">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <label>Produit en vedette</label>
                </div>
                <button type="submit" className="dashboard-form-submit">
                  {currentProduct
                    ? "Enregistrer les modifications"
                    : "Ajouter le produit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackOffice;
