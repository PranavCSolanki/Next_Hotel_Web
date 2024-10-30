"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryLogin from "../_components/DeliveryLogin";
import DeliveryRegistration from "../_components/DeliveryRegistration";
import Link from "next/link";
import DeliveryHeader from "../_components/DeliveryHeader";
import Footer from "../_components/Footer";

export default function Page() {
  const [login, setLogin] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("delivery");

    if (user) {
      router.push("/deliverydashboard");
    }
  });
  return (
    <>
      <DeliveryHeader/>
      
          
          <h1 className="text-center text-3xl font-bold pt-5">Delivery Partner Authantication</h1>

      {login ? (
        <>
          <DeliveryLogin />
          <button
            onClick={() => setLogin(!login)}
            className=" w-80 m-auto flex justify-center text-red-600 font-bold"
          >
            if do not register then Create an Account
          </button>
        </>
      ) : (
        <>
          <DeliveryRegistration />

          <button
            onClick={() => setLogin(!login)}
            className=" w-80 m-auto flex justify-center text-red-600 font-bold"
          >
            Already have an Account
          </button>
        </>
      )}

      <Footer/>
    </>
  );
}
