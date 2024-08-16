import React, { useContext, useState, useEffect } from 'react';
import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../main';

export function Contact() {

  const {isAuthenticated, setIsAuthenticated} = useContext(Context)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adharno, setAdharNo] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        { firstName, lastName, email, phone, adharno, gender, dob, password,role: "patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="container max-w-xl mx-auto text-center">
        <Typography variant="h5" color="pink" className="mb-4 !text-base lg:!text-3xl font-bold font-playfair">
        Register/Sign-in
        </Typography>
        <form onSubmit={handleSignin} className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
                First Name
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="focus:border-t-gray-900"
                containerProps={{ className: "min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
                Last Name
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="focus:border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Your Email
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Phone Number
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Adhar Card No
            </Typography>
             <Input
              color="gray"
              size="lg"
              placeholder="phone number"
              value={adharno}
              onChange={(e) => setAdharNo(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Date Of Birth
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="date"
              placeholder="Date Of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Gender
            </Typography>
            <select value={gender} onChange={(e)=> setGender(e.target.value)}>
              <option value="">Select Option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Password
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>

          <Button type="submit" className="w-full bg-regal-pink py-2">
            Submit
          </Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already registered? <Link to="/Login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Then login here</Link>
              </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
