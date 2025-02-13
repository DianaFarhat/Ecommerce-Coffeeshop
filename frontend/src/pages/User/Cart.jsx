import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, setQuantity, removeFromCart, resetCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2"; // Import SweetAlert2

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { itemsPricebeforeDiscount, itemsPriceAfterDiscount, shippingPrice, taxPrice, totalPrice } = cart;

  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUserId = storedUser?.data?.user._id; // Extract user ID safely

  const { cartItems } = cart;
  const userCartItems = cartItems.filter(item => item.userId === loggedInUserId || !item.userId);

  // Group items into bundles and separate individual products
  const bundleMap = new Map();
  const individualProducts = [];

  userCartItems.forEach((item) => {
    if (item.bundleId) {
      if (!bundleMap.has(item.bundleId)) {
        bundleMap.set(item.bundleId, []);
      }
      bundleMap.get(item.bundleId).push(item);
    } else {
      individualProducts.push(item);
    }
  });



  const addToCartHandler = (product, qty) => {
    dispatch(setQuantity({ ...product, qty }));
  };


const removeFromCartHandler = (id, bundleId = null) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this item from your cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(removeFromCart({ id, bundleId }));
      Swal.fire("Removed!", "The item has been removed.", "success");
    }
  });
};

const removeBundleFromCartHandler = (bundleId) => {
  Swal.fire({
    title: "Remove Bundle?",
    text: "Do you want to remove the entire bundle?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const bundleItems = bundleMap.get(bundleId) || [];
      bundleItems.forEach((item) => dispatch(removeFromCart({ id: item._id, bundleId })));
      Swal.fire("Removed!", "The bundle has been removed.", "success");
    }
  });
};


  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const resetCartHandler = () => {
    dispatch(resetCart());
  };

  return (
    <>
      <div className="container flex flex-col items-center mx-auto mt-8">
        {userCartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {/* Render Individual Products */}
              {individualProducts.length > 0 && (
                <div className="bg-white shadow-lg p-4 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-3">Individual Products</h2>
                  {individualProducts.map((item) => (
                    <div key={item._id} className="flex items-center mb-4 pb-2 border-b">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

                      <div className="flex-1 ml-4">
                        <Link to={`/product/${item._id}`} className="text-pink-500">{item.name}</Link>
                        <div className="text-black font-bold">${(item.price * (1 - item.discount / 100)).toFixed(2)}</div>
                      </div>

                      <select
                        className="w-20 p-1 border rounded text-black"
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </select>

                      <button className="text-red-500 ml-4" onClick={() => removeFromCartHandler(item._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Render Bundles */}
              {[...bundleMap.keys()].map((bundleId) => (
                <div key={bundleId} className="bg-gray-100 shadow-lg p-4 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-3">Bundle {bundleId}</h2>
                  {bundleMap.get(bundleId).map((item) => (
                    <div key={item._id} className="flex items-center mb-4 pb-2 border-b">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

                      <div className="flex-1 ml-4">
                        <Link to={`/product/${item._id}`} className="text-pink-500">{item.name}</Link>
                        <div className="text-black font-bold">${(item.price * (1 - item.discount / 100)).toFixed(2)}</div>
                      </div>

                 

                   
                    </div>
                  ))}

                  <button
  className="text-red-500 mt-2 py-1 px-3 rounded-lg bg-gray-200 hover:bg-red-500 hover:text-white"
  onClick={() => removeBundleFromCartHandler (bundleId)}
>
  Remove Bundle
</button>

                </div>

              ))}

              {/* Order Summary */}
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg shadow-lg bg-white">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({userCartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">Total after discount:
                    ${" "}
                    {userCartItems
                      .reduce(
                        (acc, item) =>
                          acc + item.qty * ((item.price * (100 - item.discount)) / 100),
                        0
                      )
                      .toFixed(2)}
                  </div>

                  <div className="text-2xl font-bold">
                    Subtotal: ${itemsPricebeforeDiscount}
                  </div>

                  <div className="text-2xl font-bold">
                    Discount: -$
                    {(
                      parseFloat(itemsPricebeforeDiscount) - 
                      userCartItems.reduce(
                        (acc, item) => acc + item.qty * ((item.price * (100 - item.discount)) / 100),
                        0
                      )
                    ).toFixed(2)}
                  </div>

                  <div className="text-2xl font-bold">
                    Shipping: ${shippingPrice}
                  </div>
                  <div className="text-2xl font-bold">
                    Taxes: ${taxPrice}
                  </div>
                  <div className="text-2xl font-bold">
                    <span className="font-bold">Final Total:</span> $
                    {(
                      Number(taxPrice) +
                      Number(shippingPrice) +
                      userCartItems.reduce(
                        (acc, item) => acc + item.qty * ((item.price * (100 - item.discount)) / 100),
                        0
                      )
                    ).toFixed(2)}
                  </div>

                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={userCartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>

                  <button
                    className="bg-red-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    onClick={resetCartHandler}
                  >
                    Reset Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
