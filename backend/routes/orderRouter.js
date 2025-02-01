const express= require('express')
const router=express.Router();
const userController= require("../controllers/userController");
const orderController= require("../controllers/orderController");


router.post("/new-order", userController.protect, orderControllerController.createNewOrder);




module.exports = router; 