import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Recommendation = () => {
  const [recommended, setRecommended] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Refs for scrolling
  const recommendedRef = useRef(null);
  const bundlesRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const userId = userInfo?.data?.user?._id;

        const { data: recommendedData } = await axios.get(
          `http://localhost:3000/api/products/recommendations?userId=${userId}`,
          { withCredentials: true }
        );

        const { data: bundlesData } = await axios.get(
          "http://localhost:3000/api/bundles"
        );

        setRecommended(recommendedData);
        setBundles(bundlesData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Our Recommendations for You
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {recommended.length === 0 && bundles.length === 0 ? (
            <p>No recommendations available.</p>
          ) : (
            <>
              {/* Recommended Items Section */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recommended Items
              </h3>
              <div className="relative">
                <button
                  onClick={() => scroll(recommendedRef, "left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
                >
                  <ChevronLeft size={24} />
                </button>
                <div
                  ref={recommendedRef}
                  className="flex overflow-x-auto space-x-4 scrollbar-hide"
                >
                  {recommended.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white p-4 rounded-lg shadow-lg min-w-[250px] max-w-[250px]"
                    >
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </Link>
                      <h3 className="text-lg font-semibold mt-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">${product.price}</p>
                      <Link
                        to={`/product/${product._id}`}
                        className="text-blue-500"
                      >
                        View Details →
                      </Link>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scroll(recommendedRef, "right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Recommended Bundles Section */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
                Recommended Bundles
              </h3>
              <div className="relative">
                <button
                  onClick={() => scroll(bundlesRef, "left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
                >
                  <ChevronLeft size={24} />
                </button>
                <div
                  ref={bundlesRef}
                  className="flex overflow-x-auto space-x-4 scrollbar-hide"
                >
                  {bundles.map((bundle) => (
                    <div
                      key={bundle._id}
                      className="flex flex-col justify-between min-h-screen bg-white p-8 rounded-lg shadow-lg border border-yellow-400"
                    >
                      <h3 className="text-lg font-semibold mt-2 text-yellow-600">
                        {bundle.name} (Bundle)
                      </h3>
                      <p className="text-gray-600">{bundle.description}</p>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {bundle.products.map((product) => (
                          <div key={product._id} className="text-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-md"
                            />
                            <h4 className="text-sm font-semibold mt-2">
                              {product.name}
                            </h4>
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
                        ))}
                      </div>
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
                  ))}
                </div>
                <button
                  onClick={() => scroll(bundlesRef, "right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Recommendation;
