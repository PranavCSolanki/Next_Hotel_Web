import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export default function AddFood(props) {
  const [Name, SetName] = useState("");
  const [Price, SetPrice] = useState("");
  const [Path, SetPath] = useState("");
  const [Description, SetDescription] = useState("");
  const [Catagory, SetCatagory] = useState("");

  const router = useRouter();
  let restoid;
  let restodata = JSON.parse(localStorage.getItem("restouser"));

  if (restodata) {
    restoid = restodata._id;
  }

  const SubmitData = async (e) => {
    e.preventDefault();


    if (Name == "" || Description == "" || Price == "" || Path == "") {
      SetErr(true);
      return true;
    }

    try {
      let result = await fetch("http://localhost:3000/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          description: Description,
          price: Price,
          path: Path,
          restaurantId: restoid,
          "category": Catagory

     
        }),
      });

result = await result.json()

      if (result) {
        toast.success("Food Item added");
    props.setfood(false)
      } else {
        toast.error("Please try again Later");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8  ">
      <div className=" min-h-full w-96 block m-auto flex-1 flex-col justify-center px-6  py-12 lg:px-8 border-emerald-900 border-2 bg-slate-100  rounded-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-blue-600">
            Add Food Item
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={SubmitData}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Food Item Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={Name}
                  onChange={(e) => SetName(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Path"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Path
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="Path"
                  name="Path"
                  type="text"
                  value={Path}
                  onChange={(e) => SetPath(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="Description"
                  name="Description"
                  type="text"
                  value={Description}
                  onChange={(e) => SetDescription(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Catagory"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Catagory
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="Catagory"
                  name="Catagory"
                  type="text"
                  value={Catagory}
                  onChange={(e) => SetCatagory(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Price
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="Price"
                  name="Price"
                  type="number"
                  value={Price}
                  onChange={(e) => SetPrice(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offSet-2 focus-visible:outline-indigo-600"
              >
                Add Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
