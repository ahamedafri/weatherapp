import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Wicon from '../assets/wt.png';
import loca from '../assets/location.png';
import wea from '../assets/wea.png';
import pressure from '../assets/presure.png'
import wind from '../assets/wind.png'
import temp from '../assets/temp.png'
import visibility from '../assets/visibilty.png'
import humidity from '../assets/humidity.png'


const Weather = () => {
    const [weatherData,setWeatherData] = useState(null);
    const [showAllForecasts, setShowAllForecasts] = useState(false);
    const [latitude,setLatitude] = useState(6.927079);
    const [longitude,setLongitude] = useState(79.861244);


  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
    useEffect(() => {
        getWeatherData();
        setLatitude('');
        setLongitude('');
      }, []); // Update the weather data when latitude or longitude changes
    
      const handleLatitudeChange = (event) => {
        setLatitude(event.target.value);
      };
    
      const handleLongitudeChange = (event) => {
        setLongitude(event.target.value);
      };

  const handleSubmit = (e) => {
      e.preventDefault();
      getWeatherData();
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=86460a5a3583dcdc68303a513079ff71`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };



const filterForecasts = (forecasts) => {
    const filteredForecasts = {};
    forecasts.forEach((forecast) => {
      const date = forecast.dt_txt.split(' ')[0]; // Extract date part
      if (!filteredForecasts[date] || forecast.dt_txt.includes('12:00:00')) {
        // Keep the first entry for each day or the one at 12:00:00
        filteredForecasts[date] = forecast;
      }
    });
    return Object.values(filteredForecasts);
  };

  const visibleForecasts = weatherData
    ? showAllForecasts
      ? filterForecasts(weatherData.list)
      : filterForecasts(weatherData.list).slice(0, 3)
    : [];

 return (
      <div className="bg_img">      
        <form  onSubmit={(e) => handleSubmit(e)}>
        <div className="search">
          <input
            type="text"
            placeholder="Enter Latitude"
            value={latitude}
            onChange={handleLatitudeChange}
            className="city-input"
          />
          <input
            type="text"
            placeholder="Enter longitude"
            value={longitude}
            onChange={handleLongitudeChange}
            className="city-input"
          />
          <button type='submit' onClick={handleSubmit} className="city-input">Search</button>
       </div>   
         
        </form>
        {weatherData && (
        <div className="weather-info">
        <div className="box_container grid">
          <div className="box">
            <img className='img' src={loca} alt="Location" /> 
            <h1>{weatherData.city.name}, {weatherData.city.country}</h1>
          </div>
          <div className="box">
            <p>Current Temperature</p> 
            <h3>{weatherData.list[0].main.temp}°C</h3>
            <img className='img' src={temp} alt="Weather" />
          </div>
          <div className="box">
            <p>Weather</p> 
            <h3>{weatherData.list[0].weather[0].description}</h3>
            <img className='img' src={wea} alt="Weather" />
          </div>
          <div className="box">
            <p>Humidity</p> 
            <h3>{weatherData.list[0].main.humidity}%</h3>
            <img className='img' src={humidity} alt="Weather" />
          </div>
          <div className="box">
            <p>Wind Speed</p> 
            <h3>{weatherData.list[0].wind.speed} m/s</h3>
            <img className='img' src={wind} alt="Weather" />
          </div>
          <div className="box">
            <p>Pressure</p> 
            <h3>{weatherData.list[0].main.pressure} hPa</h3>
            <img className='img' src={pressure} alt="Weather" />
          </div>
          <div className="box">
            <p>Visibility</p> 
            <h3>{weatherData.list[0].visibility} meters</h3>
            <img className='img' src={visibility} alt="Weather" />
          </div>
          <div className="box">
          <img className='img' src={Wicon} alt="Location" /> 
          </div>
        </div>
        <div className="table">
          <table >
            <thead>
              <tr>
                <th>Date(yyyy-mm-dd)</th>
                <th>Min Temperature (°C)</th>
                <th>Max Temperature (°C)</th>
                <th>Weather</th>
                <th>Humidity</th>
                <th>Wind Speed</th>
                <th>Pressure</th>
                <th>Visibility</th>
              </tr>
            </thead>
            <tbody>
              {visibleForecasts.map((forecast) => (
                <tr key={forecast.dt} className="visible">
                  <td>{forecast.dt_txt.split(' ')[0]}</td>
                  <td>{forecast.main.temp_min}</td>
                  <td>{forecast.main.temp_max}</td>
                  <td>{forecast.weather[0].description}</td>
                  <td>{forecast.main.humidity}%</td>
                  <td>{forecast.wind.speed} m/s</td>
                  <td>{forecast.main.pressure} hPa</td>
                  <td>{forecast.visibility} meters</td>
                </tr>
              ))} 
            </tbody>           
          </table>
          
        </div>
        <div className="button-container">
              {filterForecasts(weatherData.list).length > 3 && !showAllForecasts && (
              <button onClick={() => setShowAllForecasts(true)}>See More</button> 
                )}
              { showAllForecasts && <button onClick={() => setShowAllForecasts(false)}>See less</button> }
        </div> 
        <div className="button-container2">
           <button onClick={handleLogout}>Logout</button>
        </div>

      </div>
      )}
      </div>
);
};

export default Weather;