const apiKey = '67b92f0af5416edbfe58458f502b0a31';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const appContainer = document.querySelector('.app-container');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const iconElement = document.querySelector('.weather-icon');
const humidityElement = document.querySelector('.humidity');
const windSpeedElement = document.querySelector('.wind-speed');
const visibilityElement = document.querySelector('.visibility');
const rainPredictionElement = document.querySelector('.rain-prediction');
const sunriseElement = document.querySelector('.sunrise');
const sunsetElement = document.querySelector('.sunset');
const cityInput = document.getElementById('cityInput');

async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        alert(error.message);
    }
}

function updateUI(data) {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    iconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    visibilityElement.textContent = `Visibility: ${data.visibility / 1000} km`;
    rainPredictionElement.textContent = `Rain Prediction: ${data.rain ? data.rain['1h'] : 0}%`;
    sunriseElement.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunsetElement.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
}

async function searchWeather() {
    const city = cityInput.value.trim();
    if (city) {
        const weatherData = await getWeatherData(city);
        if (weatherData) {
            updateUI(weatherData);
        }
    } else {
        alert('Please enter a city name.');
    }
}
