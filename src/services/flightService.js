import axios from "axios";

const AMADEUS_API_KEY = "mEbKqtTZXFW7Aa7nPqAnBSKLvsGSIdra"; // Replace with your actual API key
const AMADEUS_API_SECRET = "N7hB8kcnGSIMRyXA"; // Replace with your actual API secret

// Function to obtain access token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET
      })
    );

    return response.data.access_token; 
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  }
};

// Function to fetch flight data
export const searchFlights = async (origin, destination, departureDate, returnDate, adults = 1) => {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate,
          returnDate: returnDate,
          adults: adults,
          currencyCode: "USD",
          max: 5
        }
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    throw error;
  }
};
