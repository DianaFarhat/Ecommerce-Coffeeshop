const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const bundleSchema= new mongoose.Schema({
    bundleName: {
        type: String,
        required: [true, "Add the bundle name"],
        trim: true,
        minLength:3,
        unique: true,
    },
    bundleItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    bundlePercentageDiscount: {
        type: Number,
        required: [true, "Please include the bundle discount"]
    }
        
    
})

//Insue that bundle has at least 2 items
bundleSchema.pre("save", function (next) {
    if (this.bundleItems.length < 2) {
        return next(new Error("A bundle must contain at least two products."));
    }
    next();
});

module.exports= mongoose.model("Bundle", bundleSchema);