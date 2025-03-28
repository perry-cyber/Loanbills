import React, { useState } from 'react';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

const flights = [
  {
    id: 1,
    airline: 'Lufthansa',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Lufthansa_Logo_2018.svg/2560px-Lufthansa_Logo_2018.svg.png',
    price: 2523988,
    departure: '23:55',
    arrival: '22:55',
    duration: '20h 0m',
    stops: 1,
    from: 'Lagos',
    to: 'Dubai',
    refundable: false
  },
  {
    id: 2,
    airline: 'Swiss International Airlines',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Swiss_International_Air_Lines_Logo_2011.svg/2560px-Swiss_International_Air_Lines_Logo_2011.svg.png',
    price: 2611926,
    departure: '10:30',
    arrival: '22:10',
    duration: '11h 40m',
    stops: 0,
    from: 'Lagos',
    to: 'Dubai',
    refundable: true
  }
];

const FlightSearchResults = () => {
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedSort, setSelectedSort] = useState('Cheapest');
  const [showFilters, setShowFilters] = useState(false);

  const handleStopChange = (stop) => {
    setSelectedStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const handleAirlineChange = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    );
  };

  const filteredFlights = flights.filter((flight) => {
    const stopMatch = selectedStops.length === 0 || selectedStops.includes(flight.stops);
    const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline);
    return stopMatch && airlineMatch;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="font-semibold text-lg">One Way Flights</h2>
        <button className="text-sm bg-blue-700 px-3 py-1 rounded-md hidden md:block">
          Book Now to secure the best fares
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="md:hidden text-sm underline">
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar Filters */}
        {(showFilters || window.innerWidth >= 768) && (
          <div className="w-full md:w-1/4 bg-white p-4 border-b md:border-r md:border-b-0">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Stops */}
            <div className="mb-6">
              <h3 className="text-gray-600 font-medium">Stops from Lagos</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleStopChange(0)}
                    checked={selectedStops.includes(0)}
                    className="mr-2"
                  />
                  Non stop (0)
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleStopChange(1)}
                    checked={selectedStops.includes(1)}
                    className="mr-2"
                  />
                  1 Stop (1)
                </label>
              </div>
            </div>

            {/* Airlines */}
            <div>
              <h3 className="text-gray-600 font-medium">Airlines</h3>
              <div className="mt-2 space-y-2">
                {flights.map((flight) => (
                  <label key={flight.id} className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleAirlineChange(flight.airline)}
                      checked={selectedAirlines.includes(flight.airline)}
                      className="mr-2"
                    />
                    {flight.airline} – ₦{flight.price.toLocaleString()}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Flight List */}
        <div className="w-full md:w-3/4 p-4">

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b mb-4">
            {['Cheapest', 'Fastest', 'Recommended'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedSort(tab)}
                className={`py-2 px-4 whitespace-nowrap ${
                  selectedSort === tab
                    ? 'border-b-2 border-blue-500 font-semibold text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {tab} Fare
              </button>
            ))}
          </div>

          {/* Flight Results */}
          <div className="space-y-4">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0"
                >
                  {/* Airline Info */}
                  <div className="flex items-center">
                    <img src={flight.logo} alt={flight.airline} className="w-10 h-10 mr-3" />
                    <div>
                      <p className="font-semibold">{flight.airline}</p>
                      <p className="text-sm text-gray-500">
                        Depart: {flight.departure}
                      </p>
                    </div>
                  </div>

                  {/* Time Info */}
                  <div className="text-center">
                    <p className="text-xl font-bold">{flight.departure}</p>
                    <p className="text-gray-500">{flight.from}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-red-500">{flight.duration}</p>
                    <p className="text-gray-500">{flight.stops} Stop{flight.stops > 1 && 's'}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-bold">{flight.arrival}</p>
                    <p className="text-gray-500">{flight.to}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-right">
                    <p className="text-sm text-green-600">{flight.refundable ? 'Refundable' : 'Non Refundable'}</p>
                    <p className="text-xl font-bold">₦{flight.price.toLocaleString()}</p>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2 text-sm w-full md:w-auto">
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No result found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResults;
