const express= require('express')
const router=express.Router();
const {getBundles,getBundleProducts}= require ('../controllers/bundleController');

router.get("/", getBundles);

// Get product IDs from a specific bundle
router.get("/:id/products", getBundleProducts);

 
module.exports = router; 