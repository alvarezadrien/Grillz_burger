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
                    name: String,
                    price: Number,
                },
            ],
            default: [],
        },
        included: {
            type: [String],
            default: [],
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        spiciness: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Burger = mongoose.model("Burger", burgerSchema);
export default Burger;
