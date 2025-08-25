import mongoose from "mongoose";

const burgerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        ingredients: {
            type: [String],
            default: [],
        },
        allergens: {
            type: [String],
            default: [],
        },
        additions: {
            type: [
                {
                    name: String,       // Nom de l'ajout, ex: "Bacon", "Fromage supplément"
                    price: Number,      // Prix additionnel
                },
            ],
            default: [],
        },
        included: {
            type: [String],        // Ce qui est compris dans le burger, ex: "Pain", "Sauce"
            default: [],
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,          // URL de l'image
            default: "",
        },
        spiciness: {
            type: Number,          // Piquant de 0 à 5
            min: 0,
            max: 5,
            default: 0,
        },
        tags: {
            type: [String],        // Ex: ["best seller", "vegan", "nouveau"]
            default: [],
        },
        featured: {
            type: Boolean,         // Pour mise en avant sur la page d'accueil
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Burger = mongoose.model("Burger", burgerSchema);
export default Burger;
