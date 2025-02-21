import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export function Signup({ toggleForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log(data);

      // Reset data
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Form could not be submitted, Error :", error);
    }
  };

  return (
    <Card color="transparent" shadow={false} className="p-4 md:p-8">
      <Typography variant="h4" color="blue-gray" className="text-center">
        Create a new account
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-center">
        Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-full sm:w-96 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            required
            size="lg"
            placeholder="John Doe"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            required
            size="lg"
            placeholder="name@mail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            required
            type="password"
            size="lg"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Checkbox
          required
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree to the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth type="submit">
          Sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a className="font-medium text-gray-900 cursor-pointer" onClick={toggleForm}>
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
