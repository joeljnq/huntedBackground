import React from "react";
import pumpkin from '../assets/images/pumpkin.png'
import ghost from '../assets/images/ghost.png'
import bats from '../assets/images/bats.png'
import skull from '../assets/images/skull.png'
import { Link } from "react-router-dom";
import '../assets/styles/title.css'


export const LandingPage: React.FC = () => {
  return (
      <div className="container bg-gradient-to-b max-w-full from-black to-gray-900/90 min-h-screen lg:py-40">
        <header className="text-center ">
          <h1 id="title" className=" lg:text-4xl text-xl text-white pt-20">
            HauntedBackground
          </h1>
        </header>
        <div className=" flex flex-col items-center justify-center">
          <p id="subtitle" className="roboto text-center text-2xl mt-10">Change background and compress your image </p>
          <div className="mt-5 flex gap-5">
            <Link to="/drag-and-drop" className="roboto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl">Get Started</Link>
            <Link to="/demo" className="roboto bg-white hover:bg-gray-300 text-blue-700 font-bold py-2 px-4 rounded-full text-xl">Get a Demo</Link>

          </div>

        </div>
        
        <div className="bg-gradient-to-r from-orange-400/50 to-transparent lg:w-1/2 w-32 h-40 absolute bottom-4 left-48 rounded-full blur-3xl"></div>
        <img src={bats} alt="bats" className="absolute lg:w-72 md:w-64 top-14 w-36 left-0 lg:left-32 rotate-12" />
        <img src={ghost} alt="ghost" className="absolute lg:w-64 w-20 top-0 right-0 lg:right-32 rotate-12 " />
        <img src={pumpkin} alt="pumpkin" className="absolute lg:w-2/6 md:w-2/6 w-48 bottom-4 lg:left-32 left-4"  />
        <img src={skull} alt="grove" className="absolute lg:w-96 bottom-28 lg:bottom-4 w-32 right-10 lg:right-32 -scale-x-100" />
      </div>
  );
};
