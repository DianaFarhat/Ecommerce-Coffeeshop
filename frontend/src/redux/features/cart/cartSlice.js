import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cartUtils";
// Function to get the user’s cart using the user ID
const getUserCart = () => {
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUserId = storedUser?.data?.user._id; // Extract user ID safely

  if (!loggedInUserId) return { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

  const allCarts = JSON.parse(localStorage.getItem("carts")) || {}; // Get all carts
  return allCarts[loggedInUserId] || { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
};

const initialState = getUserCart();

// // Function to fetch product details from the backend
// const fetchProductDetails = async (productId) => {
//   try {
//     const { data } = await axios.get(`http://localhost:3000/api/products/${productId}`);
//     return data;
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     return null;
//   }
// };

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, bundleId, ...item } = action.payload;
  
      const newItem = {
          ...item,
          bundleId: bundleId || null,  // Store the bundle ID if it exists
          isBundle: item.isBundle || false,
          discount: item.discount || 0,
      };
  
      // Find if an identical product (same ID & bundleId) exists in cart
      const existItem = state.cartItems.find(
          (x) => x._id === item._id && x.bundleId === (bundleId || null)
      );
  
      if (existItem && !newItem.bundleId) {
          // If the product is NOT part of a bundle, update its quantity
          state.cartItems = state.cartItems.map((x) =>
              x._id === existItem._id ? { ...x, qty: newItem.qty, discount: newItem.discount } : x
          );
      } else {
          // If the product is part of a bundle (or does not exist), add separately
          state.cartItems = [...state.cartItems, newItem];
      }
  
      updateCart(state);
  },
  

    addBundleToCart: (state, action) => {
      const { bundle, products } = action.payload;
    
      products.forEach((product) => {
        // Ensure each product in the bundle is stored separately with qty = 1
        state.cartItems = [
          ...state.cartItems,
          { ...product, qty: 1, bundleId: bundle._id, isBundle: true },
        ];
      });
    
      updateCart(state);
    },
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },

    resetCart: (state) => {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));
      const loggedInUserId = storedUser?.data?.user._id; // Extract user ID safely
      if (loggedInUserId) {
        const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
        delete allCarts[loggedInUserId]; // Remove only the logged-in user's cart
        localStorage.setItem("carts", JSON.stringify(allCarts));
      }
      return getUserCart(); // Reset the cart with the user's cart data
    },

   refreshCart:(state)=>{
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));
      const loggedInUserId = storedUser?.data?.user._id; // Extract user ID safely
    
      if (!loggedInUserId) return { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
    
      const allCarts = JSON.parse(localStorage.getItem("carts")) || {}; // Get all carts
      return allCarts[loggedInUserId] || { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
    
    
  }}
});

export const {
  addToCart,
  removeFromCart,addBundleToCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,refreshCart
} = cartSlice.actions;

export default cartSlice.reducer;