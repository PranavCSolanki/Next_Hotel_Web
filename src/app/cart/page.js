"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify"; 
import Footer from "../_components/Footer";
import CustomerHeader from "../_components/CutomerHeader";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [quantities, setQuantities] = useState({});
  const router = useRouter()

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.prodid] || 1),
    0
  );

  useEffect(() => {
    const cartsString = localStorage.getItem("carts");
    const userString = localStorage.getItem("user");
    const carts = JSON.parse(cartsString) || [];
    const users = JSON.parse(userString) || {};
    setCartItems(carts);
    setUser(users);

    const initialQuantities = {};
    carts.forEach((item) => {
      initialQuantities[item.prodid] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const Add = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const Minus = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };

  const DeleteItem = async (id) => {
    const cartItems = JSON.parse(localStorage.getItem("carts"));
    const index = cartItems.findIndex((item) => item.prodid === id);
    if (index !== -1) {
      
      cartItems.splice(index, 1);
      localStorage.setItem("carts", JSON.stringify(cartItems));
      setCartItems(cartItems);
      toast.success("Item deleted successfully");
    }
    
  
  };



  const Checkout = async () => {

    const cartItems = JSON.parse(localStorage.getItem("carts"));
    const user = JSON.parse(localStorage.getItem("user"));

    // console.log(user.city);
    
    let cities = user.city
    
    let deliveryboyrespose = await fetch("http://localhost:3000/api/deliveryorder/" + cities)
    
    deliveryboyrespose = await deliveryboyrespose.json()
    
    // console.log(deliveryboyrespose);
    console.log(deliveryboyrespose);
    
    
    let deliveryboyid = deliveryboyrespose.data.map((item)=>item._id)
    // console.log(deliveryboyid);
    // deliveryboyid = deliveryboyrespose[Math.floor((Math.random()*deliveryboyid.length))]
    console.log(deliveryboyid[0]);
    
    console.log(cartItems[0]);
    
    
    
    let foodItems = cartItems.map((item) => ({
      prodid: item.prodid,
      quantity: quantities[item.prodid] || 1,
    }));
     
    // console.log({
    //   user_id: user._id,
    //   foodItems: foodItems,
    //   restaurantId: cartItems[0].restaurantId,
    //   deleveryboy_id: deliveryboyid,
    //   status: "pending",
    //   amount: total,
    // });
    try {
      const payload = {
        user_id: user._id,
        foodItems: foodItems,
        restaurantId: cartItems[0].restaurantId,
        deleveryboy_id: deliveryboyid[0],
        status: "pending",
        amount: total,
      };

      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        localStorage.removeItem("carts")
        router.push("/")
        
      } else {
        const errorResult = await response.json();
        toast.error(errorResult.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <>
      <CustomerHeader />
      <div className="pt-10 pb-16 flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <div className="relative max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105">
          <div className="px-8 py-6 border-b border-gray-300 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b border-gray-300 pb-2">
              Shopping Cart
            </h1>
            <div className="mt-8">
              <div className="flow-root">
                {cartItems.map((item) => (
                  <li
                    key={item.prodid}
                    className="flex py-6 m-5 hover:bg-gray-50 transition-colors duration-300 ease-in-out rounded-lg shadow-lg bg-white transform hover:shadow-2xl"
                  >
                    <div className="flex-shrink-0 mx-4 overflow-hidden rounded-lg">
                      <div className="h-32 w-32 shadow-md border-4 border-gradient-to-br from-pink-300 to-yellow-300">
                        <img
                          alt={item.description}
                          src={item.path}
                          className="h-full w-full object-cover object-center rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                      </div>

                      <p className="text-gray-500 pt-8">
                        <button
                          className="border-2 border-gray-300 font-bold shadow px-4 py-3 rounded-2xl mr-2 bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300 ease-in-out"
                          onClick={() => Add(item.prodid)}
                        >
                          +
                        </button>
                        <span className="mx-2 text-lg font-medium">
                          {quantities[item.prodid] || 1}
                        </span>
                        <button
                          className="border-2 border-gray-300 font-bold shadow px-4 py-3 rounded-2xl ml-2 bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out"
                          onClick={() => Minus(item.prodid)}
                        >
                          -
                        </button>
                      </p>
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-lg font-medium text-gray-900">
                          <h3>
                            <p className="hover:text-indigo-600 m-10 transition-colors duration-300 ease-in-out">
                              {item.name}
                            </p>
                          </h3>
                          <p className="text-lg font-semibold m-10">
                            Rs {item.price}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 ml-10">
                          {item.category}
                        </p>
                        <p className="text-sm text-gray-500 m-10">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex justify-between text-sm mt-4">
                        <div>
                          <button
                            type="button"
                            className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-br px-6 py-3 text-base font-semibold text-white shadow-lg hover:font-bold hover:bg-gradient-to-br from-red-700 to-red-900"
                            onClick={() => DeleteItem(item.prodid)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <p>Total</p>
              <p>Rs {total}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500 mb-9">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-lg font-medium text-gray-900">
              <h3>
                <p className="hover:text-indigo-600 m-10 transition-colors duration-300 ease-in-out">
                  Customer Name
                </p>
              </h3>
              <p className="text-lg font-semibold m-10">{user.name}</p>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-900">
              <h3>
                <p className="hover:text-indigo-600 m-10 transition-colors duration-300 ease-in-out">
                  Customer Email
                </p>
              </h3>
              <p className="text-lg font-semibold m-10">{user.email}</p>
            </div>
            <button
              className="w-full rounded-md border border-transparent bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-gradient-to-br hover:font-bold hover:from-blue-800 hover:to-blue-900"
              onClick={Checkout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


//  mistral 7 b - Rating: 8/10 for web applications with NLP, 7/10 for general machine learning tasks, and 6/10 for desktop applications due to resource requirements.

// phi 2 - Rating: 7/10 for web applications, 7/10 for machine learning, and 7/10 for desktop applications due to its balance between performance and resource efficiency.

// phi 3 mini 128k 9/10 for web applications, 8/10 for machine learning, and 9/10 for desktop applications, particularly for environments where resource efficiency is key.