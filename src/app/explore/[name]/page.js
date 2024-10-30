"use client";
import FoodCard from "@/app/_components/Cards/FoodCard";
import Details from "@/app/_components/Details";
import { useEffect, useState } from "react";
import CustomerHeader from "@/app/_components/CutomerHeader";
import { useRouter } from "next/navigation";

export default function Explore(props) {
  const [data, setData] = useState({});
  const [food, setFood] = useState([]);
  const [cartData, setCartData] = useState([]);
  const router = useRouter()
  useEffect(() => {
    Getdata();
  }, []);

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("carts")) || [];
    setCartData(storedCartData);
  }, []);

  const AddtoCart = (item) => {
    setCartData((prevCartData) => {
      const isItemInCart = prevCartData.some(
        (cartItem) => cartItem.prodid === item.prodid
      );
      let updatedCartData;
      if (isItemInCart) {
        updatedCartData = prevCartData.filter(
          (cartItem) => cartItem.prodid !== item.prodid
        );
      } else {
        updatedCartData = [...prevCartData, item];
      }
      localStorage.setItem("carts", JSON.stringify(updatedCartData));
      return updatedCartData;
    });
  };

  const name = props.params.name;
  const Getdata = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/custompage/${name}`,
        {
          cache: "no-store",
        }
      );
      const result = await response.json();
      setData(result.data);
      setFood(result.food);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <CustomerHeader cartData={cartData} />
      <div className="mt-7">
        <div className="container mx-auto p-4 rounded-lg">
          <Details name={data.name} contact={data.contact} city={data.city} />
          <div className="rounded-lg">
            <h2 className="text-2xl text-center pt-7">Food Items</h2>
            <div className="m-10 p-7 rounded-2xl bg-pink-100">
              <div className="flex flex-wrap justify-evenly">
                {!food.length ? (
                  <h1>No food items</h1>
                ) : (
                  food.map((item) => (
                    <FoodCard
                      id={props.name}
                      prodid={item._id}
                      onClick={() => AddtoCart(item)}
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      path={item.path}
                      restaurantId={item.restaurantId}
                      description={item.description}
                      category={item.category}
                      AddtoCart={AddtoCart}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {cartData.length > 0 ? (
          <div className="container mx-auto w-36 p-4 rounded-lg">
            <button onClick={()=>router.push("/cart")} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full">
              Go to Cart
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

