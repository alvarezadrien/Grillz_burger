import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import burgerRoutes from "./routes/burgerRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir les images statiques
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes
app.use("/api/burgers", burgerRoutes);

// Route test
app.get("/", (req, res) => res.send("Backend fonctionne ✅"));

// Vérification MONGO_URI
if (!process.env.MONGO_URI) {
    console.error("❌ Erreur : MONGO_URI manquante !");
    process.exit(1);
}

// Connexion MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connecté à MongoDB GrillzBurger");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
    })
    .catch((err) => console.error("Erreur MongoDB:", err));
