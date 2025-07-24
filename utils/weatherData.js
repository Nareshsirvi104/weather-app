const axios = require("axios");

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "37f019b8f6e950daae80b31c1afdff06",
    UNITS: "&units=metric"
};

const weatherData = async (address, callback) => {
    try {
        const url = `${openWeatherMap.BASE_URL}${encodeURIComponent(address)}&APPID=${openWeatherMap.SECRET_KEY}${openWeatherMap.UNITS}`;
        const response = await axios.get(url);

        if (response.data) {
            const data = response.data;
            const weatherCondition = data.weather[0].description;

            const weatherInfo = {
                location: `📍 ${data.name}, ${data.sys.country}`,
                temperature: `🌡️ ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)`,
                humidity: `💧 ${data.main.humidity}%`,
                wind: `💨 ${data.wind.speed} m/s`,
                pressure: `🌍 ${data.main.pressure} hPa`,
                visibility: `👀 ${(data.visibility / 1000).toFixed(1)} km`,
                condition: `🌤️ ${weatherCondition}`
            };

            callback(false, weatherInfo);
        } else {
            callback(true, "❌ No data found for the given location.");
        }
    } catch (error) {
        callback(true, `❌ Error fetching data. Please try again.`);
    }
};

module.exports = weatherData;
