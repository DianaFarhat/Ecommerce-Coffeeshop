const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const cartSchema= new mongoose.Schema({
    cartOwner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})