"use client";
import AddFood from "@/app/_components/AddFood";
import FoodItems from "@/app/_components/Foodtems";
import Header from "@/app/_components/Header";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Page() {
  const [Food, setfood] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("restouser");

    if (!user) {
      router.push("/restorent");
    }
  });
  return (
    <div>
      <Header />

      <div className="flex justify-between pt-8 ">
        <button
          onClick={() => setfood(true)}
          className="flex w-52 m-auto justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Food
        </button>

        <button
          onClick={() => setfood(false)}
          className="flex w-52 m-auto justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Dashboard
        </button>
      </div>
      {Food ? <AddFood setfood={setfood} /> : <FoodItems />}
    </div>
  );
}
