import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import doctor from "../assets/doctor.png";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [popoverContent, setPopoverContent] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-service-n77u.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointment);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://hospital-management-service-n77u.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
  
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
  
      toast.success(data.message);
  
      // Send a message after updating the status
      const appointment = appointments.find((appt) => appt._id === appointmentId);
      const messagePayload = {
        to: `+918847787810`, // Ensure this is the correct phone number format
        body: `Your appointment status has been updated to ${status}.`
      };
  
      console.log("Sending message with payload:", messagePayload);
  
      await axios.post(
        `https://hospital-management-service-n77u.onrender.com/send-message`,
        messagePayload,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating status or sending message:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(
        `https://hospital-management-service-n77u.onrender.com/api/v1/appointment/delete/${appointmentId}`,
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const handlePopover = (appointment) => {
    setPopoverContent(appointment);
  };

  return (
    <>
      <section className="page rounded-l-[50px] flex flex-col gap-5">
        <div className="flex gap-5 h-[35vh]">
          <div className="flex items-center bg-blue-300 p-5 rounded-2xl flex-[2]">
            <img src={doctor} alt="docImg" className="h-full flex-[1]" />
            <div className="flex-[2]">
              <div className="flex items-center mb-3 text-2xl lg:text-xl">
                <p className="mr-3 text-2xl lg:text-2xl font-playfair">Hello ,</p>
                <h5 className="text-pink-600 font-jura text-2xl">
                  {admin && `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p className="text-base lg:text-sm">
                This is an Admin Interface of Aparant Hospital where you can modify and observe the relative actions in this software.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3 bg-blue-800 text-white p-5 rounded-2xl flex-[1]">
            <p className="text-xl font-semibold">Total Appointments</p>
            <h3 className="text-2xl font-bold">1500</h3>
          </div>
          <div className="flex flex-col justify-center gap-3 bg-white text-pink-600 p-5 rounded-2xl flex-[1]">
            <p className="text-xl font-semibold">Registered Doctors</p>
            <h3 className="text-2xl font-bold">10</h3>
          </div>
        </div>
        <div className="h-[65vh] bg-white p-10 rounded-2xl relative">
          <h5 className="text-xl mb-5 text-black">Appointments</h5>
          <table className="w-full text-black text-lg">
            <thead className="text-left">
              <tr>
                <th className="py-3">Patient</th>
                <th className="py-3">Date</th>
                <th className="py-3">Doctor</th>
                <th className="py-3">Department</th>
                <th className="py-3">Status</th>
                <th className="py-3">Visited</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id} onClick={() => handlePopover(appointment)}>
                    <td className="py-3">{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td className="py-3">{appointment.appointment_date.substring(0, 16)}</td>
                    <td className="py-3">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td className="py-3">{appointment.department}</td>
                    <td className="py-3">
                      <select
                        className={`font-semibold text-lg border-none w-full focus:outline-none ${
                          appointment.status === "Pending"
                            ? "text-yellow-500"
                            : appointment.status === "Accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        value={appointment.status}
                        onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                      >
                        <option value="Pending" className="text-yellow-500">
                          Pending
                        </option>
                        <option value="Accepted" className="text-green-600">
                          Accepted
                        </option>
                        <option value="Rejected" className="text-red-600">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td className="py-3 text-center">
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="text-green-600" />
                      ) : (
                        <AiFillCloseCircle className="text-red-600" />
                      )}
                    </td>
                    <td className="py-3 text-center">
                      <RiDeleteBin6Line
                        className="text-gray-300 cursor-pointer"
                        onClick={() => handleDeleteAppointment(appointment._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-3 text-center">No Appointments Found!</td>
                </tr>
              )}
            </tbody>
          </table>

          {popoverContent && (
            <div
              id="popover-default"
              role="tooltip"
              className="absolute z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700 bg-light-blue">
                <h3 className="font-semibold text-gray-900 dark:text-white">Appointment Details</h3>
              </div>
              <div className="px-3 py-2">
                <p>Patient: {`${popoverContent.firstName} ${popoverContent.lastName}`}</p>
                <p>Date: {popoverContent.appointment_date.substring(0, 16)}</p>
                <p>Doctor: {`${popoverContent.doctor.firstName} ${popoverContent.doctor.lastName}`}</p>
                <p>Department: {popoverContent.department}</p>
                <p>Phone: {popoverContent.phone}</p>
                <p>Email: {popoverContent.email}</p>
              </div>
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setPopoverContent(null)}>
                <AiFillCloseCircle className="text-red-600" />
              </div>
              <div data-popper-arrow></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
