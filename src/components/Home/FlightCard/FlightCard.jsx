import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import GlobeComponent from "../../Globe";


const FlightCard = () => {

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center max-h-[80vh] lg:max-h-[75vh] gap-6 lg:gap-20 px-6 lg:px-24 py-12 bg-gray-50">
      {/* Left Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center">
  <div className="w-[15rem] h-[15rem] lg:w-[20rem] lg:h-[20rem] rounded-full overflow-hidden flex items-center justify-center">
    <img
      src="https://content.spirit.com/a/4035"
      alt="Fly Comfy"
      className="w-full h-full object-cover"
    />
  </div>
</div>

      {/* Right Text Section */}
      <div className="lg:w-1/2 w-full mt-0 lg:mt-0 text-center lg:text-left">
        <h1 className="text-2xl lg:text-4xl font-bold text-black">
          FLY LIKE A BOSS WITH CHEAP FLIGHT PRICES <br />
          <span className="text-gray-500 text-2xl">#FEELTHE DIFFERNCE</span>
        </h1>
        <p className="mt-4 text-black">
        Fly smarter and skip the middle seat with unbeatable fares and extra perks. explore all our flight options and experience the comfort you deserve.
        </p>
        <Link to="/login">
        <button className="bg-black mt-5 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition">
  Book Now
</button>
        </Link>


      </div>
    </div>
  );
};

export default FlightCard;
