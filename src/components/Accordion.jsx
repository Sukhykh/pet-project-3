import '../assets/scss/_Accordion.scss';

import React from "react"

const Accordion = (props) => {

    const date = props.data.dt_txt.split(' ');
    const CURENT_DAY = new Date(date[0]);
    
    return (
        <div className="accordion">
            <div className="accordion__container">
                <div className="accordion__wrapper">
                    <div onClick={() => props.active.setIsActive(props.index)} className={props.active.isActive === props.index ? 'accordion__title-box' : 'accordion__title-box borders'}>
                        <div className="accordion__title">
                            {CURENT_DAY.toLocaleDateString('en-US', { month: 'long' })}, {CURENT_DAY.getDate() > 9 ? CURENT_DAY.getDate() : `0${CURENT_DAY.getDate()}`}
                        </div>
                        <div className="accordion__icon">{props.active.isActive === props.index ? 'X' : '|||'}</div>
                    </div>
                    <div className={props.active.isActive === props.index ? "accordion__body height-true" : "accordion__body height-false"}>
                        <div className="accordion__body-wrapper">
                            <img className="accordion__img" src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}.png`} alt="weather.ico" />
                            <div className="accordion__temp">{props.data.main.temp > 0 ? '+' + props.data.main.temp : props.data.main.temp}</div>
                            <div className="accordion__weather-bar">
                                <div className="accordion__weather">{props.data.weather[0].main}:</div>
                                <div className="accordion__weather">{props.data.weather[0].description}</div>
                            </div>
                            <div className="accordion__stats">Clouds: {props.data.clouds.all}%</div>
                            <div className="accordion__stats">Wind: {props.data.wind.speed} meter/sec</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion;