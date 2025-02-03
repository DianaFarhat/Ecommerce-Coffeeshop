import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cartUtils";
    
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };


//   const dummyCart = {
//     cartItems: [
//       {
//         _id: "1",
//         name: "Product 1",
//         image: "/images/product1.jpg",
//         price: 20,
//         countInStock: 5,
//         qty: 1,
//       },
//       {
//         _id: "2",
//         name: "Product 2",
//         image: "/images/product2.jpg",
//         price: 30,
//         countInStock: 3,
//         qty: 2,
//       },
//     ],
//     shippingAddress: {},
//     paymentMethod: "PayPal",
//   };

  
//   localStorage.setItem("cart", JSON.stringify(dummyCart));


  console.log("Initial Cart State:", initialState);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
    
      // Ensure isBundle and discount exist in the payload
      const newItem = {
        ...item,
        isBundle: item.isBundle || false,  // Default to false if not provided
        discount: item.discount || 10,      // Default to 0 if not provided
      };
    
      const existItem = state.cartItems.find((x) => x._id === item._id);
    
      if (existItem) {
        // Update item quantity if it exists, preserve discount
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + newItem.qty, discount: newItem.discount } : x
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }
    
      // Call the updateCart function to calculate and update the cart totals
      return updateCart(state);
    },
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;