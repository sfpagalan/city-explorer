import React, { useState, useEffect, Component} from 'react';
import PropTypes from 'prop-types';
import WeatherDay from '@/components/WeatherDay';

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
          <WeatherDay key={index} day={day} />
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
