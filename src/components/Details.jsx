import '../assets/scss/_Details.scss';

import Accordion from "./Accordion"

import React from "react"

const Details = (props) => {

    const API_KEY = `402abc8409fe5a0e656e837d6fe02f95`;
    const API_CALL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&id=`;

    const CURENT_DAY = new Date();
       
    const [weatherList, setWeatherList] = React.useState([]);
    const [isActive, setIsActive] = React.useState(null)

    React.useEffect(() => {
        apiRequest(props.details.cityId)
    }, [])

    const backToNormal = () => {
        props.details.setDetails(!props.details.details)
    }

    const apiRequest = (id) => {
        fetch(`${API_CALL}${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then((data) => {
                if (data.city.name) {
                    setWeatherList(data.list)        
                }
        })
    }

    const getCurentTime = (date) => {
        let hours, minutes, seconds;
        date.getHours() > 9 ? hours = date.getHours() : hours = `0${date.getHours()}`
        date.getMinutes() > 9 ? minutes = date.getMinutes() : minutes = `0${date.getMinutes()}`
        date.getSeconds() > 9 ? seconds = date.getSeconds() : seconds = `0${date.getSeconds()}`
        return hours + ":" + minutes + ":" + seconds
    }

    // color randomizer
    const createRandomColor = () => {
        const letters = '0123456789abcdef'.split('')
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)]
        }
        return color
    }

    return (
        <div className="complex-weather">
            <div className="complex-weather__container">
                <div className="complex-weather__wrapper">
                    <div className="complex-weather__top" style={{ backgroundColor: `${createRandomColor()}` }} >
                        <div className="complex-weather__left">
                            <div className="complex-weather__day">{CURENT_DAY.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                            <div className="complex-weather__date-box">
                                <span className="complex-weather__time">{CURENT_DAY.toLocaleDateString('en-US', { month: 'long' })}, {CURENT_DAY.getDate() > 9 ? CURENT_DAY.getDate() : `0${CURENT_DAY.getDate()}`}</span>
                                <span className="complex-weather__time">{getCurentTime(CURENT_DAY)}</span>
                            </div>
                            <div className="complex-weather__temp">{props.details.cityData.main.temp > 0 ? '+' + props.details.cityData.main.temp : props.details.cityData.main.temp}</div>
                            <div className="complex-weather__feels">
                                Feels like: {props.details.cityData.main.feels_like > 0 ? '+' + props.details.cityData.main.feels_like : props.details.cityData.main.feels_like}</div>
                            <img className="complex-weather__img" src={`http://openweathermap.org/img/wn/${props.details.cityData.weather[0].icon}@2x.png`} alt="weather.ico" />
                            <div className="complex-weather__weather">{props.details.cityData.weather[0].main}:</div>
                            <div className="complex-weather__weather">{props.details.cityData.weather[0].description}</div>
                            <div className="complex-weather__stats">
                                <div className="complex-weather__stats-title">Additional information:</div>
                                <div className="complex-weather__stats-item">Clouds: {props.details.cityData.clouds.all}%</div>
                                <div className="complex-weather__stats-item">Humidity: {props.details.cityData.main.humidity}%</div>
                                <div className="complex-weather__stats-item">Pressure: {props.details.cityData.main.pressure} hPa</div>
                                <div className="complex-weather__stats-item">Wind: {props.details.cityData.wind.speed} meter/sec</div>
                            </div>
                        </div>
                        <div className="complex-weather__right">
                            <div className="complex-weather__city-box">
                                <span className="complex-weather__city-title">{props.details.cityData.name}, </span>
                                <span className="complex-weather__country-title">{props.details.cityData.sys.country}</span>
                            </div>
                            <div className="complex-weather__props">
                                <div className="complex-weather__props-title">
                                    Weather forecast
                                </div>
                                {weatherList.map((element, index) => {
                                    let dater = element.dt_txt.split(' ')
                                    if (dater[1] === '12:00:00') {
                                        return <Accordion data={element} index={index} key={dater[0]} active={{isActive, setIsActive}}/>
                                    }
                                })}
                            </div>
                            <button className="complex-weather__btn" onClick={backToNormal}>back</button>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Details