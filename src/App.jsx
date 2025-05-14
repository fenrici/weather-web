import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import WeatherList from './components/WeatherList'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'http://api.openweathermap.org/data/2.5'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (weatherData.length === 0) return

    const timer = setInterval(() => {
      setWeatherData(prevData => {
        const [currentCard, ...data] = prevData
        const cityTime = new Date(Date.now() + (currentCard.timezone * 1000))
        
        return [{
          ...currentCard,
          time: cityTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC'
          })
        }, ...data]
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [weatherData])

  const formatTime = (timestamp, timezone) => {
    const cityTime = new Date(timestamp + (timezone * 1000))
    return cityTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    })
  }

  const fetchWeatherData = async (city) => {
    try {
      setError(null)
      
      // Primero obtenemos el clima actual
      const currentResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      
      if (!currentResponse.ok) {
        throw new Error('Ciudad no encontrada')
      }

      const currentData = await currentResponse.json()

      // obtenemos el pronóstico
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      
      if (!forecastResponse.ok) {
        throw new Error('No se pudo obtener el pronóstico')
      }

      const forecastData = await forecastResponse.json()

      const currentCard = {
        time: formatTime(Date.now(), currentData.timezone),
        temperature: Math.round(currentData.main.temp),
        weather: currentData.weather[0].main,
        timezone: currentData.timezone
      }

      const forecastCards = forecastData.list.map(item => ({
        time: formatTime(item.dt * 1000, currentData.timezone),
        temperature: Math.round(item.main.temp),
        weather: item.weather[0].main,
        timezone: currentData.timezone
      }))

      setWeatherData([currentCard, ...forecastCards])
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchForm onSearch={fetchWeatherData} />
      {error && <div className="error">{error}</div>}
      <WeatherList weatherData={weatherData} />
    </div>
  )
}

export default App
