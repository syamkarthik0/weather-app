import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');


  // Fetch weather data from backend
  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`http://localhost:8080/weather?location=${city}`);
      setData(response.data); // Store the fetched data in state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };


  // Handle input change
  const handleInputChange = (event) => {
    const input = event.target.value;
    setLocation(input);
  };

  // Handle location search on Enter key press
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData(location);
      setLocation('');
    }
  };

 

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={handleInputChange} // Update location and fetch city suggestions
          onKeyPress={searchLocation}  // Trigger search on Enter key press
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>  
          <div className="weathername">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="temp">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Temperature</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
