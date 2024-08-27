import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

const Messages = () => {
  const [casepapers, setCasePapers] = useState([]);
  const [popoverContent, setPopoverContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchCasepaper = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/casepaper/getall",
          { withCredentials: true }
        );
        setCasePapers(data.casepapers);
      } catch (error) {
        console.error("Error fetching casepapers:", error.response ? error.response.data.message : error.message);
      }
    };
    fetchCasepaper();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a first name to search");
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/casepaper/search?firstName=${searchQuery}`,
        { withCredentials: true }
      );
      setCasePapers(data.casepapers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const handlePopover = (casepaper) => {
    setPopoverContent(casepaper);
  };

  return (
    <section className="page messages bg-white">
      <h1 className="font-Playfair font-bold">CasePaper</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-l-md focus:outline-none"
          placeholder="Search by first name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="banner bg-gray-200">
        {casepapers && casepapers.length > 0 ? (
          casepapers.map((element) => (
            <div className="card relative" key={element._id} onClick={() => handlePopover(element)}>
              <div className="details">
                <p>
                  First Name: <span>{element.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{element.lastName}</span>
                </p>
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>
                  Phone: <span>{element.phone}</span>
                </p>
                <p>
                  Date Of Birth: <span>{element.dob}</span>
                </p>
                <p>
                  Chief Complaint: <span>{element.cc}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Casepaper!</h1>
        )}
      </div>

      {popoverContent && (
        <div
          id="popover-default"
          role="tooltip"
          className="absolute z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700 bg-light-blue">
            <h3 className="font-semibold text-gray-900 dark:text-white">Casepaper Details</h3>
          </div>
          <div className="px-3 py-2">
            <p>First Name: {popoverContent.firstName}</p>
            <p>Last Name: {popoverContent.lastName}</p>
            <p>Email: {popoverContent.email}</p>
            <p>Phone: {popoverContent.phone}</p>
            <p>Date Of Birth: {popoverContent.dob}</p>
            <p>Chief Complaint: {popoverContent.cc}</p>
          </div>
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setPopoverContent(null)}>
            <AiFillCloseCircle className="text-red-600" />
          </div>
          <div data-popper-arrow></div>
        </div>
      )}
    </section>
  );
};

export default Messages;
