import React from 'react';
import WeatherCard from './WeatherCard';
import './WeatherList.css';

const WeatherList = ({ weatherData }) => {
  if (!weatherData || weatherData.length === 0) {
    return <div className="weather-list-empty">No weather data available</div>;
  }

  return (
    <div className="weather-list">
      {weatherData.map((item, index) => (
        <WeatherCard
          key={index}
          time={item.time}
          temperature={item.temperature}
          weather={item.weather}
        />
      ))}
    </div>
  );
};

export default WeatherList; 