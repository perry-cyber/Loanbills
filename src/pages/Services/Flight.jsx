// src/pages/FlightPage.jsx
import React, { useState } from "react";
import { FaExchangeAlt, FaUser, FaPlane, FaCalendarAlt } from "react-icons/fa";
import FlightSearchResults from "../../components/Home/FlightCard/FlightResult";
import TravelFeatures from "../../components/FlightFeature";
import DashboardFooter from "../../components/DashboardFooter";

export default function FlightPage() {
  const [tripType, setTripType] = useState("round");
  const [fromCity, setFromCity] = useState("Select City");
  const [toCity, setToCity] = useState("Select City");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cityType, setCityType] = useState("from");

  const airportOptions = [
    { city: "New York", code: "JFK", airport: "John F. Kennedy International Airport" },
    { city: "Los Angeles", code: "LAX", airport: "Los Angeles International Airport" },
    { city: "Chicago", code: "ORD", airport: "O'Hare International Airport" },
    { city: "London", code: "LHR", airport: "Heathrow Airport" },
    { city: "Paris", code: "CDG", airport: "Charles de Gaulle Airport" },
    { city: "Dubai", code: "DXB", airport: "Dubai International Airport" }
  ];

  const handleSearch = () => {
    const mockData = [
      { id: 1, airline: "Air Canada", price: "$450", duration: "5h 30m" },
      { id: 2, airline: "Lufthansa", price: "$560", duration: "6h 15m" },
      { id: 3, airline: "Emirates", price: "$670", duration: "7h 10m" }
    ];
    setSearchResults(mockData);
  };

  const selectCity = (city, code, airport) => {
    const selected = `${city} (${code}) - ${airport}`;
    if (cityType === "from") {
      setFromCity(selected);
    } else {
      setToCity(selected);
    }
    setShowModal(false);
  };

  return (
    <>
    <div className="pt-16 pb-16 min-h-auto bg-gradient-to-b from-black to-gray-200 flex items-center flex-col  justify-center p-4">
      <div className="bg-gradient-to-b from-gray-200 to-gray-400  shadow-lg rounded-lg p-8 w-full ">
        
        {/* Trip Type Selection */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex  gap-4">
            {["one", "round", "multi"].map((type) => (
             <label key={type}  className="flex sm:text-[12px] items-center">
             <input
               type="radio"
               name="trip"
               value={type}
               checked={tripType === type}
               onChange={() => setTripType(type)}
               className="mr-2 accent-black"
             />
             {type === "one" && "One Way"}
             {type === "round" && "Round Trip"}
             {type === "multi" && "Multi City"}
           </label>
           
            ))}
          </div>
          <select className="mt-4 md:mt-0 p-2 border rounded w-full md:w-auto">
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </div>

        {/* City Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div
            className="bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setCityType("from");
              setShowModal(true);
            }}
          >
            <p className="text-gray-500">From</p>
            <h2 className="text-2xl font-bold">{fromCity}</h2>
          </div>

          <div
            className="bg-gray-100 p-4 rounded-md cursor-pointer relative hover:bg-gray-200"
            onClick={() => {
              setCityType("to");
              setShowModal(true);
            }}
          >
            <p className="text-gray-500">To</p>
            <h2 className="text-2xl font-bold">{toCity}</h2>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaExchangeAlt className="text-blue-500 text-3xl" />
            </div>
          </div>
        </div>

        {/* Departure, Return, and Passenger Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-md flex flex-col">
            <p className="text-gray-500">Departure</p>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-600" />
              <span className="text-xl">26 Mar’25</span>
            </div>
            <p className="text-sm">Wednesday</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md flex flex-col">
            <p className="text-gray-500">Return</p>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-600" />
              <span className="text-xl">28 Mar’25</span>
            </div>
            <p className="text-sm">Friday</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md flex flex-col">
            <p className="text-gray-500">Passenger</p>
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-600" />
              <span className="text-xl">1 Passenger</span>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6">
          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 py-3 rounded-md w-full md:w-auto hover:bg-slate-900 transition"
          >
            SEARCH
          </button>
        </div>
       

        {/* Flight Results
        {searchResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold">Flight Results</h3>
            <FlightSearchResults />
          </div>
        )} */}

        {/* City Selection Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Select City</h2>
              <ul className="space-y-4">
                {airportOptions.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => selectCity(airport.city, airport.code, airport.airport)}
                    className="flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100"
                  >
                    <div>
                      <span className="text-lg font-semibold">{airport.city}</span>
                      <span className="text-gray-500 ml-2">({airport.code})</span>
                    </div>
                    <span className="text-gray-500 text-sm">{airport.airport}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <TravelFeatures/>
 
    </div>
    <DashboardFooter />
    </>
  );
}
