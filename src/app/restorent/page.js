"use client"
import { useEffect, useState } from "react";
import Login from "../_components/Login";
import Registration from "../_components/Registration";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

export default function Page() {
    const [login, setLogin] = useState(true)

    const router = useRouter()
    
    useEffect(() => {
        const user = localStorage.getItem("restouser")

        if (user) {
            router.push("/restorent/dashboard")
        }

    })
    return (
        <>
            <Header/>
            {login ? <Login /> : <Registration />}

            
            <button onClick={() => setLogin(!login)}
                className="flex w-80 m-auto justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {login ? "Register" : "Sign in"}
            </button>
            
            <Footer/>
        </>
        
    );
}