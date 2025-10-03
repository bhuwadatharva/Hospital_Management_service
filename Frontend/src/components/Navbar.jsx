import React, { useContext, useState } from "react";
import aparantnav from "../assets/aparantnav.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // for hamburger icons

const Navbar = () => {
  const { isPatientAuthenticated, setIsPatientAuthenticated } =
    useContext(Context);
  const navigateTo = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await axios
      .get("https://backend-vy3x.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsPatientAuthenticated(false);
        navigateTo("/"); // optional: go home after logout
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Logout failed");
      });
  };

  const gotoLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={aparantnav} alt="aparant logo" className="w-14 sm:w-16" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r text-2xl font-bold from-regal-pink to-pink-500">
              Aparant
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-light-pink transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/appointment"
                  className="hover:text-light-pink transition-colors"
                >
                  Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-light-pink transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-light-pink transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {isPatientAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-6 text-white bg-regal-pink px-5 py-2 rounded-lg hover:opacity-90"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={gotoLogin}
                className="ml-6 text-white bg-regal-pink px-5 py-2 rounded-lg hover:opacity-90"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="flex flex-col px-6 py-4 space-y-4 font-medium">
              <li>
                <Link
                  to="/"
                  className="block hover:text-light-pink"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/appointment"
                  className="block hover:text-light-pink"
                  onClick={() => setMenuOpen(false)}
                >
                  Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block hover:text-light-pink"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block hover:text-light-pink"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="px-6 pb-4">
              {isPatientAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-white bg-regal-pink px-5 py-2 rounded-lg hover:opacity-90"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    gotoLogin();
                    setMenuOpen(false);
                  }}
                  className="w-full text-white bg-regal-pink px-5 py-2 rounded-lg hover:opacity-90"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
