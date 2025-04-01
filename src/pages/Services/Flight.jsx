import React, { useState } from "react";
import { FaUser, FaPlane, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlightSearchResults from "../../components/Home/FlightCard/FlightResult";
import TravelFeatures from "../../components/FlightFeature";
import DashboardFooter from "../../components/DashboardFooter";





import { motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import FAQ from "../../components/FAQs";





export default function FlightPage() {

  const categories = [
    { label: "Adults", age: "18-64", key: "adults", defaultValue: 1 },
    { label: "Students", age: "over 18", key: "students", defaultValue: 0 },
    { label: "Seniors", age: "over 65", key: "seniors", defaultValue: 0 },
    { label: "Youths", age: "12-17", key: "youths", defaultValue: 0 },
    { label: "Children", age: "2-11", key: "children", defaultValue: 0 },
    { label: "Toddlers in own seat", age: "under 2", key: "toddlers", defaultValue: 0 },
    { label: "Infants on lap", age: "under 2", key: "infants", defaultValue: 0 },
  ];
  
  
    const [isOpen, setIsOpen] = useState(false);
    const [passengers, setPassengers] = useState(
      categories.reduce((acc, category) => {
        acc[category.key] = category.defaultValue;
        return acc;
      }, {})
    );
  
    const totalPassengers = Object.values(passengers).reduce((a, b) => a + b, 0);
  
    const updateCount = (key, delta) => {
      setPassengers((prev) => {
        const newValue = Math.max(0, prev[key] + delta);
        return { ...prev, [key]: newValue };
      });
    };


  const [tripType, setTripType] = useState("round");
  const [fromCity, setFromCity] = useState("Select City");
  const [toCity, setToCity] = useState("Select City");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
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


  

  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = () => {
    // Simulating no flights found
    setShowPopup(true);
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
      <div className="pt-16 pb-16 min-h-auto bg-gradient-to-b from-black to-gray-200 flex items-center flex-col justify-center p-4">
        <div className="bg-gradient-to-b from-gray-200 to-gray-400 shadow-lg rounded-lg p-8 w-full">
          <h1 className="text-lg md:text-4xl font-bold text-gray-900">
            Search cheap flights by destination
          </h1>
          <h2 className="md:text-xl text-xs text-gray-800 mt-2">Find Cheap Flights</h2>

          {/* Trip Type Selection */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-4">
              {["one", "round", "multi"].map((type) => (
                <label key={type} className="flex pt-6 text-[12px] items-center">
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
            </div>
          </div>

          {/* Departure, Return, and Passenger Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-100 p-4 rounded-md flex flex-col">
              <p className="text-gray-500">Departure</p>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-600" />
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  className="text-xl outline-none border-none bg-transparent"
                  minDate={new Date()}
                />
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex flex-col">
              <p className="text-gray-500">Return</p>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-600" />
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  className="text-xl outline-none border-none bg-transparent"
                  minDate={departureDate}
                  disabled={tripType === "one"} // Disable return date for one-way trips
                />
              </div>
              
            </div>
     
            {/* <div className="bg-gray-100 p-4 rounded-md flex flex-col"> */}
            <div className="relative w-72">
      <div
        className="bg-gray-100 p-4 rounded-md flex flex-col cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-gray-500">Passenger</p>
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-600" />
          <span className="text-xl">{totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}</span>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full bg-white shadow-lg rounded-md mt-2 p-4 max-h-96 overflow-y-auto"
        >
          <p className="font-semibold">Travelers</p>
          {categories.map(({ label, age, key }) => (
            <div key={key} className="flex justify-between items-center py-2 border-b last:border-none">
              <div>
                <p className="font-medium">{label} <span className="text-gray-500 text-sm">{age}</span></p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCount(key, -1)}
                  className="p-1 border rounded-md disabled:opacity-50"
                  disabled={passengers[key] === 0}
                >
                  <FiMinus />
                </button>
                <span className="w-6 text-center">{passengers[key]}</span>
                <button
                  onClick={() => updateCount(key, 1)}
                  className="p-1 border rounded-md"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
            </div>
            <button
        onClick={handleSearch}
        className="bg-black text-white px-6 py-3 mt-10 rounded-md w-full md:w-auto hover:bg-slate-900 transition"
      >
        SEARCH
      </button>
          </div>

          {/* Search Button */}
          <div >
     
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-full text-center shadow-lg">
            <div className="flex flex-col items-center justify-center">
            <img
              src="https://www.kayak.com/res/images/horizon/flights/results/noFlightResults@2x.png" // Replace with actual image path
              alt="No flights found"
              className="h-28 lg:h-48 mb-4"
            />
            <h2 className="text-lg font-bold">No flights found</h2>
            <p className="text-gray-600">
              There are no flights available on your chosen dates. Try changing the dates of your search.
            </p>
            </div>
            
            <button
              onClick={() => setShowPopup(false)}
              className="bg-black text-white px-6 py-2 mt-4 rounded-md hover:bg-slate-800 transition"
            >
              Modify your search
            </button>
          </div>
        </div>
      )}
  












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
                <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-gray-300 rounded">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <TravelFeatures />
        <FAQ/>
      </div>
      <DashboardFooter />
    </>
  );
}
