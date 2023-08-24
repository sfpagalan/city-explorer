import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Weather = ({ lat, lon }) => {
    const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetch(`/weather?lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, [lat, lon]);

  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      <div className="forecast-list">
        {weatherData.map((day, index) => (
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
