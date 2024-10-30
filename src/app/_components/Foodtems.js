import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FoodItems() {
  const [data, setData] = useState([]);
  let restodata = JSON.parse(localStorage.getItem("restouser"));

  const router = useRouter()

  async function GetData() {
    try {
      if (restodata) {
        let restoid = restodata._id;
        let response = await fetch(`http://localhost:3000/api/food/${restoid}`);
        let data1 = await response.json();

        if (Array.isArray(data1.result)) {
          setData(data1.result);
        } else {
          console.error("Fetched data is not an array:", data1.result);
          setData([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    }
    

    const DeleteItem = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/food/` + id, {
                method: "DELETE"
            });
    
            if (response.ok) {
              let data = await response.json();
              toast.success("Food data deleted successfully")
                GetData();
            } else {
                let errorData = await response.json();
                console.error("Error deleting data:", errorData);
                toast.error("Data not deleted");
            }
        } catch (error) {
            console.error("Network or server error:", error);
        }
    };
    
  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="m-10">
      <div className="w-4/5 m-auto h-4 pt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
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
                    {item.name}
                  </td>
                  <td className="p-4">
                    <img
                      src={item.path}
                      className="w-12 md:w-28 rounded-xl  max-w-full max-h-full"
                      alt={item.name}
                    />
                  </td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => router.push(`/restorent/dashboard/${item._id}`)}
                      className="font-medium text-blue-600 pr-6 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                              
                              onClick={()=>DeleteItem(item._id)}
                      className="font-medium text-red-600  dark:text-red-500 hover:underline"
                    >
                      Delete 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
