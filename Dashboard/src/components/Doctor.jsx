import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-vy3x.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1 className="font-Playfair font-bold">DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4 className="font-playfair font-bold">{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p className="text-xl">
                    Email: <span className="font-playfair">{element.email}</span>
                  </p>
                  <p className="text-xl">
                    Phone: <span className="font-playfair">{element.phone}</span>
                  </p>
                  <p className="text-xl">
                    DOB: <span className="font-playfair">{element.dob.substring(0, 10)}</span>
                  </p>
                  <p className="text-xl">
                    Department: <span className="font-playfair">{element.doctorDepartment}</span>
                  </p>
                  <p className="text-xl">
                    AdharNo: <span className="font-playfair">{element.adharno}</span>
                  </p>
                  <p className="text-xl">
                    Gender: <span className="font-playfair">{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctor;
