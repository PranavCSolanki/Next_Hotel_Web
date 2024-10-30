import { useRouter } from 'next/navigation';
import  { useState } from 'react';
import { toast } from 'react-toastify';
export default function DeliveryRegistration() {
  const [Name, SetName] = useState("");
  const [Password, SetPassword] = useState("");
  const [C_Password, SetC_Password] = useState("");
  const [Contact, SetContact] = useState("");
  const [Address, SetAddress] = useState("");
  const [City, SetCity] = useState("");
  const [PassErr, SetPassErr] = useState(false);
  const [Err, SetErr] = useState(false);

  const router = useRouter()
  
  const SubmitData = async (e) => {
    e.preventDefault();

    if (Password !== C_Password) {
      setPassErr(true);
      return;
    }
    if (!Name|| !Password || !C_Password || !City || !Contact || !Address) {
      setErr(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: Name,
          password: Password,
          city: City,
          contact: Contact,
          address: Address
        })
      });

      const res = await response.json();


      if (response.ok) {
        if (res.result) {
          localStorage.setItem("delivery", JSON.stringify(
            res.result
          ));
          toast.success("Registration successful");
        } else {
          toast.error("Registration failed: " + res.error);
        }
      } else {
        toast.error("Registration failed: " + res.error);
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
          Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={SubmitData}>
          
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Name
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
                htmlFor="Password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="Password"
                name="Password"
                type="Password"
                value={Password}
                onChange={(e) => SetPassword(e.target.value)}
                required
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {PassErr?<label
                htmlFor="Password"
                className="block text-sm font-medium leading-6 text-red-500"
              >
                Password and  Confirm Password do not match
              </label>: null}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="cPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="cPassword"
                name="cPassword"
                type="Password"
                value={C_Password}
                onChange={(e) => SetC_Password(e.target.value)}
                required
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {PassErr?<label
                htmlFor="Password"
                className="block text-sm font-medium leading-6 text-red-500"
              >
                Password and  Confirm Password do not match
              </label>: null}
          </div>


          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Full Address
              </label>
            </div>
            <div className="mt-2">
              <input
                id="Address"
                name="Address"
                type="text"
                value={Address}
                onChange={(e) => SetAddress(e.target.value)}
                required
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="City"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter City
              </label>
            </div>
            <div className="mt-2">
              <input
                id="City"
                name="City"
                type="text"
                value={City}
                onChange={(e) => SetCity(e.target.value)}
                required
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inSet ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inSet focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Contact"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Contact number
              </label>
            </div>
            <div className="mt-2">
              <input
                id="Contact"
                name="Contact"
                type="number"
                value={Contact}
                onChange={(e) => SetContact(e.target.value)}
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
