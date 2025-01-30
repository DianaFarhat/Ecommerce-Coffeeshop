const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
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
          default: false, // Tracks if a discount was applied (only if product is part of a bundle and all bundle items are present in the cart)
        },
        price: {
          type: Number, // Price of the product at the time of purchase
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "cancelled", "completed"],
    },
    totalPrice: {
      type: Number,
      required: true, // You could dynamically calculate this based on orderItems
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "visa", "other"],
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
