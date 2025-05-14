import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ time, temperature, weather }) => {
  // Function to get weather icon
  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      case 'drizzle':
        return '🌦️';
      case 'mist':
      case 'fog':
        return '🌫️';
      default:
        return '🌡️';
    }
  };

  return (
    <div className="weather-card">
      <h3>{time}</h3>
      <div className="weather-icon">{getWeatherIcon(weather)}</div>
      <p className="temperature">{temperature}°C</p>
      <p className="weather-condition">{weather}</p>
    </div>
  );
};

export default WeatherCard; 