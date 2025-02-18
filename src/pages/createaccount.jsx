import { useState } from "react"
import { Signup } from "../components/signup"
import { Signin } from "../components/signin";
import "../components/createaccount.css"

const Createaccount = () => {
    const [isSignup , setIsSignUp ] = useState(true); 


    const toggleForm = () => {
        setIsSignUp(!isSignup); 
    }
  return (
    <>
    <div className="px-20 py-5 bg-blue-gray-100">
    <div className={`grid-flow-col grid gap-10 p-4 mx-20 border-double border-black border-2 rounded-2xl ${isSignup ? "signin-mode" : "signup-mode"}`}>

     {/*  Card div     */}
    <div className="bg-blue-gray-900 text-white items-center justify-center flex flex-col max-w-screen-sm rounded-xl card" style={{height:"35vw"}}>
    <p className="font-semibold text-4xl text-center p-4" onClick={toggleForm}>
       { isSignup ? "Welcome to Magnews" : "Welcome back !"}
    </p>
    <p className="text-xl font-light">
        Take a moment to { isSignup ? "Create you account " : "Sign in  "} 
    </p>
    </div>

    {/* Sign up card  */}
    <div className={'${isSignup ? signup-form : signin-form} p-3'}>
       {isSignup ? <Signup toggleForm = {toggleForm} /> : <Signin toggleForm={toggleForm}/> }
    </div>  
    </div> 
    </div>
    </>
  )
}

export default Createaccount
