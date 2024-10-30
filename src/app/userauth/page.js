"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CutomerHeader";
import Footer from "../_components/Footer";
import UserLogin from "../_components/UserLogin";
import { useRouter } from "next/navigation";
import UserRegistration from "../_components/UserRegistration";

export default function Page() {
    const [login, setLogin] = useState(true)

    const router = useRouter()
    
    useEffect(() => {
        const user = localStorage.getItem("user")

        if (user) {
            router.push("/")

        }
    })
    return (
        <div>
            <CustomerHeader setLogin={setLogin} />
            {login ? <UserLogin /> : <UserRegistration />}


            <button onClick={() => setLogin(!login)}
                className="mb-24 w-80 m-auto flex justify-center text-red-600 font-bold"
              >
                {login ? "if do not register then Create an Account" : "Already have an Account"}
            </button>



            <Footer/>
        </div>
    );
}