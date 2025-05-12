import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ time, temperature, weather }) => {
  return (
    <div className="weather-card">
      <h3>{time}</h3>
      <p className="temperature">{temperature}°C</p>
      <p className="weather-condition">{weather}</p>
    </div>
  );
};

export default WeatherCard; 