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

// Connexion à MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connecté à MongoDB GrillzBurger");
        app.listen(process.env.PORT || 5000, () =>
            console.log(`🚀 Serveur sur http://localhost:${process.env.PORT || 5000}`)
        );
    })
    .catch((err) => console.error("Erreur MongoDB:", err));
