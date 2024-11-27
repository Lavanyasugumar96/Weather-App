import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // To hold the city name input
  const [weatherData, setWeatherData] = useState(null); // To hold fetched weather data
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(false); // To manage error state

  const API_KEY = "0243ec33882a4386b3c141127242711"; // Replace with your Weather API key

  const handleSearch = async () => {
    if (!city) return; // Do nothing if input is empty
    setLoading(true);
    setError(false);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Invalid city name");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(true);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather Application</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading && <p className="loading-message">Loading data…</p>}

      {weatherData && (
        <>
          <h2>{weatherData.location.name}</h2>
          <div className="weather-cards">
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weatherData.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{weatherData.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{weatherData.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{weatherData.current.wind_kph} kph</p>
            </div>
          </div>
        </>
      )}

      {error && <p className="error-message">Failed to fetch weather data</p>}
    </div>
  );
}

export default App;