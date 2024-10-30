
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserLogin() {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");

  const router = useRouter()
  const SignIn = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/api/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      
      const res = await response.json();
  
      if (response.ok) {
        if (res.result) {
          localStorage.setItem("user", JSON.stringify(
            res.data
          ));
          router.push("/");
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
               User Login
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={Email}
                      onChange={(e) => SetEmail(e.target.value)}
                      required
                      autoComplete="email"
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
