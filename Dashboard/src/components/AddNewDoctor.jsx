import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import { Button, Input, Typography } from "@material-tailwind/react";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adharno, setAdharNo] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("adharno", adharno);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      await axios
        .post("https://hospital-management-service-n77u.onrender.com/api/v1/user/doctor/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
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
          setDoctorDepartment("");
          setDocAvatar("");
          setDocAvatarPreview("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page flex flex-col lg:flex-row items-start bg-white">
      <div className="lg:w-1/3 flex flex-col items-center">
        <img
          src={docAvatarPreview || "/docHolder.jpg"}
          alt="Doctor Avatar"
          className="h-48 w-48 object-cover mb-4"
        />
        <input type="file" onChange={handleAvatar} className="mb-4" />
      </div>
      <div className="lg:w-2/3 flex flex-col items-start">
        <form onSubmit={handleAddNewDoctor} className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-4">
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
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Adhar Card No
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Adhar Card No"
              value={adharno}
              onChange={(e) => setAdharNo(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
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
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Gender
            </Typography>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="focus:border-t-gray-900 min-w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
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
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Department
            </Typography>
            <select
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
              className="focus:border-t-gray-900 min-w-full"
            >
              <option value="">Select Department</option>
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full bg-regal-pink py-2">
            Add Doctor
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;




 {/* <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                }
                alt="Doctor Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="number"
                placeholder="Adhar card no"
                value={adharno}
                onChange={(e) => setAdharNo(e.target.value)}
              />
              <input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={doctorDepartment}
                onChange={(e) => {
                  setDoctorDepartment(e.target.value);
                }}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.572830069863!2d73.51218317493807!3d17.527893383383397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc207cee76d7f0f%3A0x4a47762445f5075f!2sAparant%20Hospital!5e0!3m2!1sen!2sin!4v1721492233325!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
    </section>*/}
