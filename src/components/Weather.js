import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Weather = ({ lat, lon, searchQuery }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(`/weather?lat=${lat}&lon=${lon}&searchQuery=${searchQuery}`)
      .then(response => response.json())
      .then(data => setForecast(data))
      .catch(error => console.error('Error fetching forecast:', error));
  }, [lat, lon, searchQuery]);

  return (
    <div className="weather-container">
      <h2>Weather Forecast for {searchQuery}</h2>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div className="forecast-item" key={index}>
            <p>Date: {day.date}</p>
            <p>Description: {day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Weather.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Weather;
