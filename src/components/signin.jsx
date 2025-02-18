import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { MyContext } from "../myprovider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

   
  export function Signin({toggleForm }) {
      const [email , setEmail ] = useState("");
      const [password,  setPassword ] = useState(""); 
      const {person ,  change } = useContext(MyContext);
      const navigate = useNavigate() ;
      const handleSubmit = async (e) => {
        e.preventDefault() ;
        try{
            const response = await fetch('http://localhost:5000/api/signin' , {
              method : 'POST', 
              headers : {
                'Content-type' : 'application/json',
              },
              body : JSON.stringify({email , password }), 
            });   
            if(response.ok){
              const data = await response.json(); 
              console.log("User found !!"); 
              change(data);
              navigate("/");
            }else{
              alert("Sign-in failed !!") ; 
            }
            
            setEmail("");
            setPassword("");
        }
        catch(error){
            console.log("Error signing in !! Error :", error) ;
        }
      }

    return (
       <Card color="transparent" shadow={false} className="p-10">
        <Typography variant="h4" color="blue-gray">
          Sign in to your account
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value = {email}
              onChange={(e) => {setEmail(e.target.value)}}
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
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value = {password}
              onChange={(e) => {setPassword(e.target.value)}}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit">
            sign in
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a className="font-medium text-gray-900" onClick={toggleForm}>
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    );
  }