import '../assets/scss/_App.scss';

import React from 'react';

import CityWeather from "./CityWeather"
import Header from "./Header"
import Footer from "./Footer"
import Details from "./Details"

const App = () => {
	const alertCode = [
		'Location not found',
		'Location is already on the board',
		'Need to input some location',
		''
	]

	const API_KEY = `402abc8409fe5a0e656e837d6fe02f95`;
	const API_CALL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

	const [theme, setTheme] = React.useState('')
	const [city, setCity] = React.useState([])
	const [weatherData, setWeatherData] = React.useState([]);
	const [errors, setErrors] = React.useState('');
	const [details, setDetails] = React.useState(false);
	const [cityId, setCityId] = React.useState('');
	const [cityData, setCityData] = React.useState([]);
	
	React.useEffect(() => {
		themeFinder();
		setErrors(alertCode[3])
		getCityBar();
	}, [])

	// apdate theme after render
	const themeFinder = () => {
		const themeValue = localStorage.getItem('theme');
		if (themeValue) {
			setTheme(themeValue)
		} else {
			setTheme('light')
			localStorage.setItem('theme', theme)
		}
	}
	
	// get city after render
	const getCityBar = async () => {
		let cityBar = localStorage.getItem('city')
		localStorage.removeItem('city');
		if (!cityBar) {
			return
		}
		let cityValue = cityBar.split(' ');
		let weatherDataBar = [], cityDataBar=[];
		for (let i = 0; i < cityValue.length; i++) {
			const response = await fetch(`${API_CALL}${cityValue[i]}`);
			const dataInfo = await response.json();
			if (!city.includes(dataInfo.name)) {
				weatherDataBar.push(dataInfo);
				cityDataBar.push(dataInfo.name);		
				setErrors(alertCode[3]);
				createCityBar(dataInfo.name);
			}
		}
		setWeatherData(weatherDataBar);
		setCity(cityDataBar);
	}

	// response from API
	const getWeatherFromApi = async (cityValue) => {
		const response = await fetch(`${API_CALL}${cityValue}`);
		if (response.status !== 200) {
			setErrors(alertCode[0]);
			return
		}
		const dataInfo = await response.json();
		if (!city.includes(dataInfo.name)) {
			setWeatherData([...weatherData, dataInfo]);
			setCity([...city, dataInfo.name]);			
			setErrors(alertCode[3]);
			createCityBar(dataInfo.name);
		} else {
			setErrors(alertCode[1])
		}
		
	}

	// create local storage with city
	const createCityBar = (name) => {
		let cityValue = localStorage.getItem('city');
		if (!cityValue) {
			localStorage.setItem('city', name);
		} else {
			cityValue += ' ' + name
			localStorage.setItem('city', cityValue);
		}
	}

	// create weatherData
	const cityAdder = async (event) => {
		const cityName = await event.target.parentNode.querySelector('.add-city__title')
		if (cityName.value) {
			getWeatherFromApi(cityName.value);
		} else {
			setErrors(alertCode[2])
		}
		cityName.value = ''		
	}
	
	// theme switcher
	const toggleTheme = () => {
		setTheme((current) => {
			if (current === "light") {
				localStorage.setItem('theme', "dark");
				return "dark"
			} else {
				localStorage.setItem('theme', "light");
				return "light"
			}
		})
	}	
	
	return (
		<div className="app" id={theme}>
			<div className="app__container">
				<div className="app__wrapper">
					<div className="app__divider">
						<Header themeClicker={toggleTheme} title={theme} />
						{!details && <main className="main">
							<div className="main__container">
								<div className="main__wrapper">
									{weatherData.map(item => {
										return <CityWeather key={item.name} data={item}
											delete={{ city, setCity, weatherData, setWeatherData }}
											details={{ details, setDetails, cityId, setCityId, cityData, setCityData }} />
									})}
									<div className="add-city">
										<div className="add-city__container">
											<div className="add-city__wrapper">
												<input className="add-city__title" type="text" placeholder='Start searching here' />
												<button className="add-city__btn" onClick={(event) => cityAdder(event)}>add city</button>
											</div>
											<div className="add-city__errors">{errors}</div>
										</div>
									</div>
								</div>
							</div>
						</main>}
						{details && <Details details={{ details, setDetails, cityId, setCityId, cityData, setCityData }} />}
					</div>
					<Footer />
				</div>
			</div>
		</div>
	)
};

export default App;
