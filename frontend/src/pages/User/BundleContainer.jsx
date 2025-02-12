import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "react-feather"; // Or any icon you prefer
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const BundleContainer = ({ bundles }) => {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const bundlesRef = useRef(null);
    const dispatch = useDispatch();

  // Define the handleAddBundleToCart function
  const handleAddBundleToCart = async (bundleId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/bundles/${bundleId}/products`
      );
      const products = await response.json();
      products.forEach((product) => {
        dispatch(addToCart(product));
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
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Bundles Container */}
      <div
        ref={bundlesRef}
        className="flex overflow-x-hidden"
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
                <p>Loading products...</p>
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
                className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Add Bundle to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default BundleContainer;
