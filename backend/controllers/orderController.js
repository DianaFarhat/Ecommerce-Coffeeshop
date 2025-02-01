const Cart= require("../models/cartModel");
const User= require("../models/userModel");
const Order= require("../models/orderModel");

exports.createNewOrder= async (req, res)=> {
    try {
        //1. Get the cart
        const cart= await Cart.findOne({_id: req.body.cartID});
        if (!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        //2. Get the cart owner
        const cartOwner= await User.findOne({_id: req.body.cartOwner});
        if (!cartOwner){
            return res.status(404).json({message: "User not found"});
        }

        //3. If cart & cart owner is found, create new Order
        const newOrder= new Order({
            orderOwner: cartOwner._id,
            items: cart.cartItems,  //Check 
            status: "pending"
        });

        await newOrder.save();

        //4. Emply the Cart
        cart.cartItems= [];
        await cart.save();

        res.status(200).json({message: "Order Created"});

    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}


//Cancel Order