
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DeliveryLogin() {
  const [Mobile, SetMobile] = useState("");
  const [Password, SetPassword] = useState("");

    const router = useRouter()
    

    useEffect(() => {
      const user = localStorage.getItem("delivery");
  
      
      if (!user) {
        router.push("/delivery");
      } else if (user) {
        // setdata(true);
        router.push("/deliverydashboard");
      }
    },[]);
  const SignIn = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/api/deliverylogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact: Mobile, password: Password }),
      });
      
      const res = await response.json();
  
      if (response.ok) {
        if (res.result) {
          localStorage.setItem("delivery", JSON.stringify(
            res.data
          ));
          router.push("/deliverydashboard");
          toast.success("Login successful");
        } else {
          alert("Login failed: " + res.error);
        }
      } else {
        alert("Login failed: " + res.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };
  
  return (
   
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  ">
          <div className=" min-h-full w-96 block m-auto flex-1 flex-col justify-center px-6  py-12 lg:px-8 border-emerald-900 border-2 bg-slate-100  rounded-xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-blue-600">
               Delivery Login
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="contact"
                      name="contact"
                      type="number"
                      value={Mobile}
                      onChange={(e) => SetMobile(e.target.value)}
                      required
                      className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <Link
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={Password}
                      onChange={(e) => SetPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={SignIn}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
  );
}
