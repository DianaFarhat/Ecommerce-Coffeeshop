const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    cartOwner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartItems: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            appliedDiscount: {
                type: Boolean,
                default: false, // Tracks if a discount was applied (only if product is part of a bundle and all bundle  items are present in the cart)
            },
        }
    ]
},
{ timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
