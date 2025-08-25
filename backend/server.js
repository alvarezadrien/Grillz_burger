import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import burgerRoutes from "./routes/burgerRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dossiers statiques
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");

// Crée le dossier uploads s’il n’existe pas
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use("/uploads", express.static(uploadsDir));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Multer config pour gérer l'upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Route pour uploader une image
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Pas de fichier" });
    res.json({ url: `/uploads/${req.file.filename}` });
});

// Routes burgers
app.use("/api/burgers", burgerRoutes);

// Route test
app.get("/", (req, res) => res.send("Backend fonctionne ✅"));

// Connexion MongoDB
if (!process.env.MONGO_URI) {
    console.error("❌ Erreur : MONGO_URI manquante !");
    process.exit(1);
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connecté à MongoDB GrillzBurger");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
    })
    .catch((err) => console.error("Erreur MongoDB:", err));
