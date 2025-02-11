
// controllers
const {
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,getRecommendedProducts,
  filterProducts,
} =require("../controllers/productController.js");
const {authenticate} = require("../middlewares/authMiddleware.js");
const  {checkId} = require ("../middlewares/checkId.js");


const express=require('express')
const router = express.Router();


// router
//   .route("/")
//   .get(fetchProducts)
//   .post(authenticate, authorizeAdmin, formidable(), addProduct);



router.route("/").get(fetchProducts)

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.get("/recommendations", getRecommendedProducts);


router
  .route("/:id")
  .get(fetchProductById)
 


//   router
//   .route("/:id")
//   .get(fetchProductById)
//   .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
//   .delete(authenticate, authorizeAdmin, removeProduct);

router.post("/filter", filterProducts);

// Fetch multiple products by their IDs
router.post("/multiple", async (req, res) => {
  try {
    const { productIds } = req.body; // Receive product IDs as an array

    // Fetch products matching the given IDs
    const products = await Product.find({ _id: { $in: productIds } });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products", details: error.message });
  }
});

module.exports = router; 