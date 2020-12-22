import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

const Weather = ({capital}) => {
    const [weatherInfo, setWeatherInfo] = useState({});
    const [hasInfo, setHasInfo] = useState(false);

    const access_key = process.env.REACT_APP_API_KEY

    const params = {
        access_key: access_key,
        query: capital
    }


    // let weatherUrl = 'http://api.weatherstack.com/current ? access_key = YOUR_ACCESS_KEY & query = ' + capital

    const getWeatherInfo = () => {
        axios
            .get('http://api.weatherstack.com/current',
                {
                    params: params,
                })
            .then(response => {
                console.log("got weather")
                setWeatherInfo(response.data)
                setHasInfo(true)
            })

    }
    // eslint-disable-next-line
    useEffect(getWeatherInfo,[])


    console.log(weatherInfo)


    return (
        <div>
            {hasInfo && <WeatherInfo weatherInfo={weatherInfo}/>}
        </div>
    )
}

export default Weather