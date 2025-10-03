import React from "react";
import aparant from "../assets/aparant.png";
import ambulance from "../assets/ambulance.png";
import chemist from "../assets/chemist.jpg";
import emergency from "../assets/emergency.jpg";
import equip from "../assets/equip.jpg";
import multi from "../assets/multi.jpg";
import team from "../assets/team.jpg";
import emergence from "../assets/emergence.avif";
import am from "../assets/am.png";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1
            className="font-bold text-3xl lg:text-5xl"
            style={{ fontWeight: 900 }}
          >
            Welcome to Aparant Hospital !!
          </h1>
          <p className="mt-5 text-lg lg:text-xl font-playfair leading-relaxed">
            ” Aparant hospital “ is based on a trivalent ideology of
            <span className="font-semibold">
              {" "}
              AAROGYA / AAPULKI / AADHAR
            </span>{" "}
            (Health / Empathy / Support). It is a Healthcare facility with an
            Empathetic Approach towards Mankind at the very personal & very
            individual level, treating them as a Human Being rather than just a
            case, a patient, or merely a medical condition.
          </p>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
          <img
            src={aparant}
            className="w-full max-w-md h-auto rounded-xl shadow-lg"
            alt="Aparant Hospital"
          />
        </div>
      </div>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-20 mt-16">
        {[multi, team, am, emergence, chemist, equip].map((src, index) => (
          <div
            key={index}
            className="max-w-sm w-full mx-auto rounded-xl overflow-hidden shadow-lg border border-slate-300 transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl bg-white"
          >
            <img
              className="w-full h-48 object-cover"
              src={src}
              alt={`Card image ${index + 1}`}
            />
            <div className="p-6">
              <h3 className="font-bold text-lg md:text-xl mb-2">
                The Coldest Sunset
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
