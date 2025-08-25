import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Import des routes
import burgerRoutes from "./routes/burgerRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Utilisation des routes
app.use("/api/burgers", burgerRoutes);

// Route test
app.get("/", (req, res) => {
    res.send("Backend fonctionne ✅");
});

// Vérification de la variable d'environnement
if (!process.env.MONGO_URI) {
    console.error(
        "❌ Erreur : La variable d'environnement MONGO_URI est manquante !"
    );
    process.exit(1); // Arrête le serveur si MONGO_URI n'existe pas
}

// Connexion à MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connecté à MongoDB GrillzBurger");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () =>
            console.log(`🚀 Serveur sur http://localhost:${PORT}`)
        );
    })
    .catch((err) => console.error("Erreur MongoDB:", err));
