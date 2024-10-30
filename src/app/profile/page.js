"use client"
import CustomerHeader from "../_components/CutomerHeader";
import { useEffect, useState } from "react";

export default function Profile() {
  const [data, setData] = useState([]);
    

  async function GetData() {
    try {
        let response = await fetch(`http://localhost:3000/api/order/?id=66b329a5f0c436f7b1da89b4`);
        let data1 = await response.json();
        console.log(data1.data);
        setData(data1.data);
        
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    }
    

    
  useEffect(() => {
    GetData();
  }, []);

  return (
      <>
          <CustomerHeader/>
        <div className="m-10">
          <div className="w-4/5 m-auto h-4 pt-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Restorent
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Items
                    </th>
        
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.status}
                      </td>
                      <td className="px-6 py-4">{item.amount}</td>
                      <td className="px-6 py-4">{item.restaurantId}</td>
                      <td className="px-6 py-4">{item.foodItems.length}</td>
        
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
    </>
  );
}
