import express from "express";
import Burger from "../models/Burger.js";

const router = express.Router();

// ➡️ GET tous les burgers
router.get("/", async (req, res) => {
    try {
        const burgers = await Burger.find();
        res.status(200).json(burgers);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des burgers" });
    }
});

// ➡️ POST ajouter un burger
router.post("/", async (req, res) => {
    try {
        const { name, price, ingredients } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: "Le nom et le prix sont requis" });
        }

        const newBurger = new Burger({ name, price, ingredients });
        await newBurger.save();
        res.status(201).json(newBurger);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'ajout du burger" });
    }
});

export default router;
