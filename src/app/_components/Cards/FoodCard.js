import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function FoodCard({
  prodid,
  name,
  price,
  path,
  category,
  description,
  restaurantId,
  AddtoCart,
}) {
  const [Include, setInclude] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carts")) || [];
    if (data.some(item => item.prodid === prodid)) {
      setInclude(true);
    }
  }, [prodid]);

  const handleAddToCart = () => {
    AddtoCart({
      name,
      price,
      path,
      category,
      description,
      restaurantId,
      prodid,
    });
    setInclude(!Include);
  };

  return (
    <div className="mx-auto w-80 bg-slate-200 rounded-3xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 border-2 border-neutral-800 shadow-xl">
      <img
        alt={name}
        src={path}
        className="h-40 w-64 object-cover rounded-3xl object-center"
      />
      <h3 className="mt-4 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
        {name}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">Rs {price}</p>
      <p className="mt-1 text-sm font-medium text-gray-600">{category}</p>
      <p className="mt-1 text-lg font-medium text-gray-700">{description}</p>

      <div className="mt-4 flex justify-center">
        {Include ? (
          <button
            className={`bg-red-800 p-2 text-white rounded-lg hover:bg-red-600 transition-colors duration-300`}
            onClick={handleAddToCart}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className={`bg-blue-800 p-2 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

FoodCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  restaurantId: PropTypes.string.isRequired,
  prodid: PropTypes.string.isRequired,
  AddtoCart: PropTypes.func.isRequired,
};
