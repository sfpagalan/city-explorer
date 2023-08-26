import React, { Component } from 'react';
import PropTypes from 'prop-types';

const WeatherDay = ({ day }) => {
  return (
    <div className="forecast-item">
      <p>Date: {day.date}</p>
      <p>Description: {day.description}</p>
    </div>
  );
};

WeatherDay.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default WeatherDay;
