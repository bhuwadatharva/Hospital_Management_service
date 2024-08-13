import React, { useContext } from 'react'
import aparantnav from "../assets/aparantnav.png"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Context } from "../main"
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const {isPatientAuthenticated, setIsPatientAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
    .get(
      "https://backend-lilac-theta.vercel.app/api/v1/user/logout", {
        withCredentials: true,
      }
    )
    .then((res)=> {
      toast.success(res.data.message);
      setIsPatientAuthenticated(false);
    })
    .catch((err)=> {
      toast.error(err.response.data.message);
    });
  };

  const gotoLogin = () => {
    navigateTo("/login");
  }

  return (
    <>
    <nav className='bg-white py-2 brder-slate-400 border-2'>
        <div className='conatiner py-2 md:py-2 '> 
        <div className='flex items-center justify-between'>
            
                <a href="#" className='flex items-center gap-3'>
                <img src={aparantnav} alt="aparant logo"  className='w-20'/>
                <span className='text-transparent bg-clip-text bg-gradient-to-r text-2xl font-bold from-regal-pink to-pink-500'>
                Aparant
                </span>
                </a>
           
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
               {isPatientAuthenticated ? (
        <button
          type="button"
          className="text-white bg-regal-pink focus:ring-4 focus:outline-none focus:ring-light-pink font-medium rounded-lg text-sm px-6 py-2 text-center dark:focus:ring-blue-800 mr-6"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          className="text-white bg-regal-pink focus:ring-4 focus:outline-none focus:ring-light-pink font-medium rounded-lg text-sm px-6 py-2 text-center dark:focus:ring-blue-800 mr-6"
          onClick={gotoLogin}
        >
          Login
        </button>
      )}
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-light-pink md:dark:hover:text-light-pink dark:text-white dark:hover:bg-light-pink dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/appointment" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-light-pink md:dark:hover:text-light-pink dark:text-white dark:hover:bg-light-pink dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Appointment</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-light-pink md:dark:hover:text-light-pink dark:text-white dark:hover:bg-light-pink dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-light-pink md:dark:hover:text-light-pink dark:text-white dark:hover:bg-light-pink dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </nav>
    <Outlet/>
    </>
  );
};

export default Navbar;

