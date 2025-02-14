import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "react-feather"; // Or any icon you prefer
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const BundleContainer = ({ bundles }) => {

  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bundleStockStatus, setBundleStockStatus] = useState({});
  const bundlesRef = useRef(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // Check if the bundle is in the cart already
  const isBundleInCart = (bundleId) => {
    return cartItems.some(item => item.isBundle && item.bundleId === bundleId);
  };

  const checkBundleStock = (bundle) => {
    console.log('Checking bundle:', bundle);  // Log the entire bundle to see what data is being passed
  
    // If the bundle or its products are missing, consider it out of stock
    if (!bundle?.products || bundle.products.length === 0) {
      console.log('Bundle is missing products or products array is empty');  // Log when this condition is true
      return true;
    }
  
    // Check if any product in the bundle is out of stock
    const isOutOfStock = bundle.products.some((product) => {
      console.log('Checking product:', product);  // Log each product in the bundle to check its data
  
      // Find the product in the cart
      const existingCartItem = cartItems.find((item) => item._id === product?._id);
      console.log('Existing cart item:', existingCartItem);  // Log the product found in the cart
  
      // Calculate the total quantity of this product in the cart
      const cartQuantity = existingCartItem ? existingCartItem.qty : 0;
      console.log('Cart quantity for this product:', cartQuantity);  // Log the cart quantity
  
      // Check if the product is out of stock or the cart quantity exceeds or equals the stock
      const isProductOutOfStock = product?.countInStock === 0 || cartQuantity >= product?.countInStock;
  
      // If the product is out of stock or the cart quantity exceeds or equals the stock, return true
      if (isProductOutOfStock) {
        console.log('Product is out of stock or cart quantity exceeds or equals stock, bundle should be out of stock');
        return true;
      }
  
      return false;  // If no products are out of stock, return false
    });
  
    console.log('Is bundle out of stock:', isOutOfStock);  // Log the final stock status of the bundle
    return isOutOfStock;
  };
  
  useEffect(() => {
    const updateStockStatus = () => {
      const stockStatus = {};
      bundles.forEach((bundle) => {
        console.log('Processing bundle:', bundle);  // Log each bundle being processed
        stockStatus[bundle._id] = checkBundleStock(bundle);
      });
      console.log('Stock status for all bundles:', stockStatus);  // Log the final stock status of all bundles
      setBundleStockStatus(stockStatus);
    };
  
    updateStockStatus();
  }, [bundles, cartItems]); // Re-run when bundles or cartItems change
  
  // Initialize userInfo state from localStorage
  const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem("userInfo")));

  // State for storing the user ID
  const [loggedInUserId, setLoggedInUserId] = useState(() => userInfo?.data?.user?._id || null);

  // Define the handleAddBundleToCart function
  const handleAddBundleToCart = async (bundleId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/bundles/${bundleId}/products`);
      const products = await response.json();

      if (products.length === 0) return;

      const cheapestProduct = products.reduce((min, product) => 
        product.price < min.price ? product : min, products[0]
      );

      products.forEach((product) => {
        const productWithDiscount = {
          ...product,
          discount: product._id === cheapestProduct._id ? 70 : 0,
          isBundle: true,
        };

        dispatch(addToCart(productWithDiscount));
      });

    } catch (error) {
      console.error("Error adding bundle products to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/products/${productId}`);
        return data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    const fetchAllProductDetails = async () => {
      setIsLoading(true);
      try {
        const productDetailsPromises = bundles.flatMap((bundle) =>
          bundle.products.map((productId) => fetchProductDetails(productId))
        );

        const productDetails = await Promise.all(productDetailsPromises);
        setProductsData(productDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProductDetails();
  }, [bundles]);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -200 : 200;
    bundlesRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };


  return (
    <div className="relative">
  {/* Left Scroll Button */}
  <button
    onClick={() => scroll("left")}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md focus:outline-none"
    aria-label="Scroll Left"
  >
    <ChevronLeft size={24} />
  </button>

  {/* Bundles Container */}
  <div
    ref={bundlesRef}
    className="flex overflow-x-auto scrollbar-hide"
    style={{
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
    }}
  >
    {bundles.map((bundle) => (
      <div
        key={bundle._id}
        className="flex-none w-full max-w-full px-2"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="flex flex-col justify-between min-h-screen bg-white p-8 rounded-lg shadow-lg border border-yellow-400">
          <h3 className="text-lg font-semibold mt-2 text-yellow-600">
            {bundle.name} (Bundle)
          </h3>
          <p className="text-gray-600">{bundle.description}</p>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center mt-4">
              <svg className="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {bundle.products.map((productId) => {
                const product = productsData.find((prod) => prod._id === productId);

                if (product) {
                  return (
                    <div key={product._id} className="text-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
                      <p className="text-gray-600">
                        <span
                          className={`${
                            product.price === bundle.cheapestPrice
                              ? "line-through text-red-500"
                              : ""
                          }`}
                        >
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-600">
              Original Price: ${bundle.originalPrice}
            </p>
            <p className="text-xl font-semibold text-yellow-600">
              Final Price: ${bundle.finalPrice}
            </p>
          </div>
          <button
            onClick={() => handleAddBundleToCart(bundle._id)}
            disabled={isLoading || isBundleInCart(bundle._id) || bundleStockStatus[bundle._id]}
            className={`mt-6 bg-yellow-500 text-white px-4 py-2 rounded-md transition-transform duration-200 hover:scale-105 focus:outline-none ${
              isLoading || isBundleInCart(bundle._id) || bundleStockStatus[bundle._id] 
                ? "opacity-50 cursor-not-allowed" 
                : ""
            }`}
          >
            {isLoading ? "Loading..." : "Add Bundle to Cart"}
          </button>

        </div>
      </div>
    ))}
  </div>

  {/* Right Scroll Button */}
  <button
    onClick={() => scroll("right")}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md focus:outline-none"
    aria-label="Scroll Right"
  >
    <ChevronRight size={24} />
  </button>
</div>
  );
};

export default BundleContainer;
