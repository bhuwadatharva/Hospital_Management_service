import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import Appointment from './components/Appointment'
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main'
import axios from 'axios'

function App() {
  const {isPatientAuthenticated, setIsPatientAuthenticated, setUser} = useContext(Context);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        setIsPatientAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsPatientAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isPatientAuthenticated]);
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About/>} />
          <Route path="register" element={<Register/>} />
          <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
      <ToastContainer position='top-center'/>
    </BrowserRouter>
    <Footer/>        
    </>
  )
}

export default App
