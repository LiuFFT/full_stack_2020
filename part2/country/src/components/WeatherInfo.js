import React from "react";

const WeatherInfo = ({weatherInfo}) => {
    return (
        <div>
            <h2>Weather in {weatherInfo.location.name}</h2>
            <p><strong>temperature</strong>: {weatherInfo.current.temperature} Celcius</p>
            {/*eslint-disable-next-line*/}
            <img src={weatherInfo.current.weather_icons[0]} style={{width: 100}}/>
            <p><strong>wind</strong>: {weatherInfo.current.wind_speed} mph direction {weatherInfo.current.wind_dir}</p>
        </div>
    )
}

export default WeatherInfo