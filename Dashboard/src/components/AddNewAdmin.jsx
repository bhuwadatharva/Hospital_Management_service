import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adharno, setAdharNo] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://backend-vy3x.onrender.com/api/v1/user/admin/addnew",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setAdharNo("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className=" page flex items-center justify-center min-h-screen bg-white">
    <div className="container max-w-xl mx-auto text-center">
      <Typography variant="h5" color="pink" className="mb-4 !text-base lg:!text-3xl font-bold text-gray-900">
      Add New Admin
      </Typography>
      <form onSubmit={handleAddNewAdmin} className="grid gap-4">
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
        </form>
      </div>
    </section>
  );
};

export default AddNewAdmin;
