import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import WeatherList from './components/WeatherList'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeatherData = async (city) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      )
      
      if (!response.ok) {
        throw new Error('City not found')
      }

      const data = await response.json()
      
      // Transform the data into our format
      const transformedData = [{
        time: new Date().toLocaleTimeString(),
        temperature: Math.round(data.main.temp),
        weather: data.weather[0].main
      }]

      setWeatherData(transformedData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchForm onSearch={fetchWeatherData} />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      <WeatherList weatherData={weatherData} />
    </div>
  )
}

export default App
