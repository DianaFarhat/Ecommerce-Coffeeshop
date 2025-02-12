import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const RecommendedBundles = () => {
  const [bundles, setBundles] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const { data: bundlesData } = await axios.get("http://localhost:3000/api/bundles");
        setBundles(bundlesData);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      }
    };

    fetchBundles();
  }, []);

  // Helper to find the cheapest product
  const getCheapestPrice = (products) => {
    return Math.min(...products.map((product) => product.price));
  };

  const handleAddBundleToCart = async (bundleId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/bundles/${bundleId}/products`);
      const products = response.data;
      products.forEach((product) => {
        dispatch(addToCart(product));
      });
    } catch (error) {
      console.error("Error adding bundle products to cart:", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Bundles</h2>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="inline-flex space-x-4">
          {bundles.map((bundle) => {
            const cheapestPrice = getCheapestPrice(bundle.products);
            return (
              <div
                key={bundle._id}
                className="bg-white p-4 rounded-lg shadow-lg border border-yellow-400 inline-block"
              >
                <h3 className="text-lg font-semibold mb-2 text-yellow-600">{bundle.name}</h3>
                <div className="flex items-center space-x-2">
                  {bundle.products.map((product, index) => (
                    <div key={product._id} className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="text-center ml-2">
                        <h4 className="text-sm">{product.name}</h4>
                        <p
                          className={`text-gray-600 ${
                            product.price === cheapestPrice ? "line-through" : ""
                          }`}
                        >
                          ${product.price}
                        </p>
                      </div>
                      {index < bundle.products.length - 1 && (
                        <span className="mx-2 text-xl font-bold text-gray-500">+</span>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleAddBundleToCart(bundle._id)}
                  className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Add Bundle to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendedBundles;
