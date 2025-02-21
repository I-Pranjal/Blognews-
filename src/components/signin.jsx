import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { MyContext } from "../myprovider";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton.jsx";

export function Signin({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { change } = useContext(MyContext);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User found !!");
        change(data);
        navigate("/");
      } else {
        alert("Sign-in failed !!");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Error signing in !! Error :", error);
    }
  };

  return (
    <Card color="transparent" shadow={false} className="p-4 md:p-10">
      <Typography variant="h4" color="blue-gray" className="text-center">
        Sign in to your account
      </Typography>

      <form
        className="mt-8 mb-2 w-full max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Sign in
        </Button>
        <span className="h-px w-full block mt-4">
        </span>
          <GoogleSignInButton />
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account ? {" "}
          <a className="font-medium text-gray-900 cursor-pointer" onClick={toggleForm}>
            Create One
          </a>
        </Typography>
      </form>
    </Card>
  );
}
