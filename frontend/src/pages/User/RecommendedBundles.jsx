import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RecommendedBundles = ({ bundles }) => {
  const bundlesRef = useRef();

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -window.innerWidth : window.innerWidth;
    bundlesRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
        Recommended Bundles
      </h3>
      <div className="relative">
        {/* Left Chevrons Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={bundlesRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide w-full"
        >
          {bundles.map((bundle) => (
            <div
              key={bundle._id}
              className="bg-white p-6 rounded-lg shadow-lg w-[100vw] flex flex-col justify-between min-h-screen border border-yellow-400"
            >
              <div>
                {/* Bundle Image */}
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-48 object-cover rounded-md"
                />

                {/* Bundle Name */}
                <h3 className="text-xl font-semibold mt-4 text-yellow-600">
                  {bundle.name} (Bundle)
                </h3>

                {/* Bundle Description */}
                <p className="text-gray-600 mt-2">{bundle.description}</p>
              </div>

              {/* Display 3 Products in Bundle */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {bundle.products.map((product, index) => (
                  <div key={product._id} className="flex flex-col items-center">
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    {/* Product Name */}
                    <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
                    {/* Product Price */}
                    <p className="text-gray-600">
                      {index === 0 ? (
                        <span className="line-through text-red-500">${product.price}</span>
                      ) : (
                        `$${product.price}`
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing Information */}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-600">
                  <strong>Original Price:</strong> ${bundle.originalPrice}
                </p>
                <p className="text-xl text-yellow-600">
                  <strong>Final Price:</strong> ${bundle.finalPrice}
                </p>
              </div>

              {/* Add Bundle to Cart */}
              <button
                onClick={() => handleAddBundleToCart(bundle._id)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Add Bundle to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Right Chevrons Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default RecommendedBundles;
