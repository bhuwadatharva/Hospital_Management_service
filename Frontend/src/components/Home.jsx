import React from 'react';
import aparant from '../assets/aparant.png';
import ambulance from '../assets/ambulance.png';
import chemist from '../assets/chemist.jpg';
import emergency from '../assets/emergency.jpg';
import equip from '../assets/equip.jpg';
import multi from '../assets/multi.jpg';
import team from '../assets/team.jpg';
import emergence from "../assets/emergence.avif"
import am from "../assets/am.png"
const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center p-4">
        <div className="lg:ml-10 text-center lg:text-left">
          <h1 className="font-bold text-2xl" style={{ fontWeight: 900 }}>
            Welcome to Aparant Hospital !!
          </h1>
          <p className="mt-5 text-xl font-playfair">
            ” Aparant hospital “ is based on a trivalent ideology of “AAROGYA/AAPULKI/AADHAR” (Health/Empathy/Support). It is a Healthcare facility with an Empathetic Approach towards Mankind at the very personal & very individual level treating him as a Human Being rather than treating him just as a case or a patient or merely a medical condition or an ailment.
          </p>
        </div>
        <img src={aparant} className="mt-8 lg:mt-0 lg:ml-16 h-96 lg:h-96" alt="Aparant Hospital" />
      </div>

      <div className="grid grid-cols-3 gap-4 justify-items-center ml-30 mt-36">
        {[multi , team, am, emergence, chemist, equip].map((src, index) => (
          <div key={index} className="max-w-sm w-full h-80 rounded overflow-hidden shadow-lg border-2 border-slate-400 mt-10 mb-10 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-100 duration-300 ...">
            <img className="w-full h-48 object-cover" src={src} alt={`Card image ${index + 1}`} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
