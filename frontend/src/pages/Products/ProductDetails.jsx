import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Ratings from './Ratings';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa';
import moment from 'moment';
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  /* const { id: productId } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart state

  // Get User Info from Local Storage
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUserId = storedUser?.data?.user._id; // Extract user ID safely

  // Check if the product is already in the cart
  const existingItem = cartItems.find((item) => item._id === product?._id);
  const currentQty = existingItem ? existingItem.qty : 0;
  const isOutOfStock = currentQty >= product?.countInStock;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const addToCartHandler = (product, qty) => {
    if (!isOutOfStock) {
      dispatch((dispatch, getState) => {
        const existItem = cartItems.find((x) =>
          String(x._id) === String(product._id) && x.isBundle === false
        );

        // Always pass just `qty` to Redux, let Redux handle updating
        dispatch(addToCart({ ...product, qty:1 }));
        toast.success("Item added successfully");
      });
    }
  }; */

  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Check if the product is already in the cart
  const existingItem = cartItems.find((item) => item._id === product?._id);
  const currentQty = existingItem ? existingItem.qty : 0;
  const isOutOfStock = currentQty >= product?.countInStock;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Fix: Pass the correct parameters and clean up the function
  const addToCartHandler = () => {
    if (!isOutOfStock && product) {
      dispatch(addToCart({ ...product, qty }));
      toast.success('Item added successfully');
    } else {
      toast.error('Out of stock');
    }
  };


  return (
    <>
      <div>
        <Link to="/" className="text-white font-semibold hover:underline ml-[10rem]">
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
              />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>
              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Added: {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews: {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings: {product.rating}
                  </h1>
                  {product.countInStock < 1 ? (
                    <h1 className="flex items-center mb-6 text-red-600">
                      <FaBox className="mr-2 text-white" /> Out of Stock
                    </h1>
                  ) : (
                    <h1 className="flex items-center mb-6 text-sky-400">
                      <FaBox className="mr-2 text-white" /> In Stock
                    </h1>
                  )}
                </div>


              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                    {userInfo ? (
                        <button
                          onClick={addToCartHandler}
                          disabled={isOutOfStock || product?.countInStock === 0}
                          className={`bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 ${
                            isOutOfStock || product?.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate('/login')}
                          className="bg-gray-500 text-white py-2 px-4 rounded-lg mt-4"
                        >
                          Login to Add to Cart
                        </button>
                    )}

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
