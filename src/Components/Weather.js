import React, { useState } from 'react';
import './Weather.css';
import { FaSearch, FaWind, FaSun } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineSpeed } from "react-icons/md";
import { TbCircuitGround } from "react-icons/tb";
import { TbWavesElectricity } from "react-icons/tb";

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState();
    const [error, setError] = useState('');

    const API_KEY = "a6ae36f6e5a9a96b2bf76f16cbddb88b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const handleOnChange = (event) => {
        setCity(event.target.value);
    };

    const fetchData = async () => {
        if (!city) return;  // Prevent empty city query
        try {
            const response = await fetch(url);
            const output = await response.json();

            if (response.ok) {
                setWeather(output);
                setError('');
            } else {
                setError('No data found. Please enter a valid city name.');
            }
        } catch (error) {
            setError('Failed to fetch data. Please try again.');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchData();  // Call fetchData when Enter key is pressed
        }
    };

    const formatTime = (timestamp, timezoneOffset) => {
        const date = new Date((timestamp + timezoneOffset) * 1000);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div className="container">
            <div className="city">
                <div className="search-container">
                    <input
                        type="text"
                        value={city}
                        onChange={handleOnChange}
                        onKeyDown={handleKeyPress} // Detect "Enter" key press
                        placeholder="Enter any city name"
                    />
                    <button onClick={fetchData}>
                        <FaSearch />
                    </button>

                </div>
            </div>


            {error && <p className="error-message">{error}</p>}

            {weather && weather.weather && (
                <div className="content">
                    <div className="weather-image">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <h3 className="desc">{weather.weather[0].description}</h3>
                    </div>

                    <div className="weather-temp">
                        <h2>{(weather.main.temp - 273.15).toFixed(1)}<span>&deg;C</span></h2>
                    </div>

                    <div className="weather-city">
                        <div className="location">
                            <MdLocationOn />
                        </div>
                        <p>
                            {weather.name}, <span>{weather.sys.country}</span>
                        </p>
                    </div>

                    <div className="weather-stats">
                        <div className="wind">
                            <div className="wind-icon">
                                <FaWind />
                            </div>
                            <h3 className="wind-speed">{weather.wind.speed} <span>m/s</span></h3>
                            <h3 className="wind-heading">Wind Speed</h3>
                        </div>

                        <div className="humidity">
                            <div className="humidity-icon">
                                <WiHumidity />
                            </div>
                            <h3 className="humidity-percent">{weather.main.humidity}<span>%</span></h3>
                            <h3 className="humidity-heading">Humidity</h3>
                        </div>
                        <div className="visibility">
                            <div className="visibility-icon">
                                <MdOutlineVisibility />
                            </div>
                            <h3 className="visibility-distance">{(weather.visibility / 1000).toFixed(1)} <span>km</span></h3>
                            <h3 className="visibility-heading">Visibility</h3>
                        </div>
                        <div className="pressure">
                            <div className="pressure-icon">
                            <MdOutlineSpeed />
                            </div>
                            <h3 className="pressure-value">{weather.main.pressure} <span>hpa</span></h3>
                            <h3 className="pressure-heading">Pressure</h3>
                        </div>


                        <div className="sea-level">
                            <div className="sea-level-icon">
                            <TbWavesElectricity />{/* You can use an icon of your choice */}
                            </div>
                            <h3 className="sea-level-value">{weather.main.sea_level} <span>m</span></h3>
                            <h3 className="sea-level-heading">Sea Level</h3>
                        </div>

                        <div className="grnd-level">
                            <div className="grnd-level-icon">
                            <TbCircuitGround /> {/* You can use an icon of your choice */}
                            </div>
                            <h3 className="grnd-level-value">{weather.main.grnd_level} <span>m</span></h3>
                            <h3 className="grnd-level-heading">Ground Level</h3>
                        </div>


                        <div className="sunrise">
                            <div className="sunrise-icon">
                                <FaSun style={{ color: '#f39c12' }} />
                            </div>
                            <h3 className="sunrise-time">{formatTime(weather.sys.sunrise, weather.timezone)}</h3>
                            <h3 className="sunrise-heading">Sunrise</h3>
                        </div>
                        <div className="sunset">
                            <div className="sunset-icon">
                                <FaSun style={{ color: '#e74c3c' }} />
                            </div>
                            <h3 className="sunset-time">{formatTime(weather.sys.sunset, weather.timezone)}</h3>
                            <h3 className="sunset-heading">Sunset</h3>
                        </div>

                    </div>


                </div>
            )}
        </div>
    );
};

export default Weather;
