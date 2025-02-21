import { useState } from "react";
import { Signup } from "../components/signup";
import { Signin } from "../components/signin";
import "../components/createaccount.css";

const Createaccount = () => {
  const [isSignup, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignup);
  };

  return (
    <>
      <div className="px-5 md:px-20 py-10 bg-gray-900 min-h-screen flex items-center justify-center">
        <div
          className={`grid gap-5 md:gap-10 p-4 border-double border-black border-2 rounded-2xl ${isSignup ? "signin-mode" : "signup-mode"}
          grid-cols-1 md:grid-cols-2 items-center justify-center bg-white`}
        >
          {/* Card div */}
          {/* <div className="bg-blue-gray-900 text-white flex flex-col items-center justify-center rounded-xl card p-8 md:p-5 w-full md:w-96 h-80 md:h-[35vw]">
            <p
              className="font-semibold text-3xl md:text-4xl text-center mb-4"
              onClick={toggleForm}
            >
              {isSignup ? "Welcome to Magnews" : "Welcome back!"}
            </p>
            <p className="text-lg md:text-xl font-light text-center">
              Take a moment to {isSignup ? "Create your account" : "Sign in"}
            </p>
          </div> */}

          {/* Sign up card */}
          <div className="w-full md:w-96 p-5">
            {isSignup ? (
              <Signup toggleForm={toggleForm} />
            ) : (
              <Signin toggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Createaccount;
