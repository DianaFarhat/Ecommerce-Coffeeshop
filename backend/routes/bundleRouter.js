const express= require('express')
const router=express.Router();
const {getBundles,getBundleProducts}= require ('../controllers/bundleController');
const Bundle =require('../models/bundleModel')
router.get("/", getBundles);

// Get product IDs from a specific bundle
router.get("/:id/products", async (req, res) => {
    console.log("Received request for bundle ID:", req.params.id);
    
    try {
        const bundle = await Bundle.findOne({ _id: req.params.id });  
      
        if (!bundle) {
            console.log("Bundle not found in database.");
            return res.status(404).json({ message: "Bundle not found" });
        }

        // ✅ Fetch correct product ObjectIds
        const productIds = bundle.products.map((product) => product._id);

        console.log("Bundle products:", productIds);
        res.json({ productIds });

    } catch (error) {
        console.error("Error fetching bundle products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

  
 
module.exports = router; 