import express from "express";
import Burger from "../models/Burger.js"; // chemin correct selon l’arborescence

const router = express.Router();

// GET tous les burgers
router.get("/", async (req, res) => {
    try {
        const burgers = await Burger.find();
        res.status(200).json(burgers);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des burgers" });
    }
});

// GET burger par ID
router.get("/:id", async (req, res) => {
    try {
        const burger = await Burger.findById(req.params.id);
        if (!burger) return res.status(404).json({ error: "Burger non trouvé" });
        res.status(200).json(burger);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du burger" });
    }
});

// POST ajouter un burger
router.post("/", async (req, res) => {
    try {
        const { name, description, ingredients, allergens, additions, included, price, image, spiciness, tags, featured } = req.body;

        if (!name || !price) return res.status(400).json({ error: "Le nom et le prix sont requis" });

        const newBurger = new Burger({ name, description, ingredients, allergens, additions, included, price, image, spiciness, tags, featured });

        await newBurger.save();
        res.status(201).json(newBurger);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'ajout du burger" });
    }
});

// PUT modifier un burger
router.put("/:id", async (req, res) => {
    try {
        const updatedBurger = await Burger.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBurger) return res.status(404).json({ error: "Burger non trouvé" });
        res.status(200).json(updatedBurger);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la modification du burger" });
    }
});

// DELETE supprimer un burger
router.delete("/:id", async (req, res) => {
    try {
        const deletedBurger = await Burger.findByIdAndDelete(req.params.id);
        if (!deletedBurger) return res.status(404).json({ error: "Burger non trouvé" });
        res.status(200).json({ message: "Burger supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du burger" });
    }
});

export default router;
