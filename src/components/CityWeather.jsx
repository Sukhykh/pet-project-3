import '../assets/scss/_CityWeather.scss';

import React from "react"

const CityWeather = React.memo((props) => {
    
    // color randomizer
    const createRandomColor = () => {
        const letters = '0123456789abcdef'.split('')
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)]
        }
        return color
    }

    const randomWidth = () => {
        let width = Math.round(Math.random() * 6);
        if (width !== 0) {
            return width;
        } else {
            randomWidth()
        }
    }

    const styledWidth = () => {
        let width = randomWidth();
        if (width === 1) {
            return 150;
        } else if (width === 2){
            return 175
        } else if (width === 3) {
            return 200
        } else if (width === 4) {
            return 225
        } else if (width === 5) {
            return 250
        } else {
            return 275
        }
    }

    const goForDetails = () => {
        props.details.setCityId(props.data.id)
        props.details.setCityData(props.data)
        props.details.setDetails(!props.details.details)
    }

    const deleteFromBar = (event) => {
        event.stopPropagation()
      
        let cityBar = localStorage.getItem('city')
        localStorage.removeItem('city');
        let cityValue = cityBar.split(' ');
        for (let i = 0; i < cityValue.length; i++) {
            if (cityValue[i] === props.data.name) {
                cityValue.splice(i, 1)
            }
        }
        localStorage.setItem('city', cityValue.join(" "))        

        let dataForDelete = props.delete.weatherData;
        let cityForDelete = props.delete.city;
        for (let i = 0; i < dataForDelete.length; i++) {
            if (cityForDelete[i] === props.data.name) {
                cityForDelete.splice(i, 1)
            }
            if (dataForDelete[i].name === props.data.name) {
                dataForDelete.splice(i, 1)
            }
        }

        props.delete.setWeatherData(dataForDelete);
        props.delete.setCity(cityForDelete);
        event.target.parentNode.remove()
    }

    return (
        <div onClick={goForDetails} className="city" style={{ width: `${styledWidth()}px` }}>
            <div className="city__container" style={{ backgroundColor: `${createRandomColor()}` }} >
                <div className="city__wrapper">
                    <div className="city__title">{props.data.name}</div>
                    <div className="city__temp">{props.data.main.temp > 0 ? '+' + props.data.main.temp : props.data.main.temp }</div>
                    <div className="city__weather">{props.data.weather[0].description}</div>
                    <img className="city__img" src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} alt="weather.ico" />
                </div>
            </div>
            <div onClick={(event) => deleteFromBar(event)} className="city__delete">remove</div>
       </div>
        )
})

export default CityWeather