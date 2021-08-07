'use strict';

const config = require('config');
const fetch = require('node-fetch');
const openWeatherToken = config.get('openWeatherToken');

async function getWeather(city) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + openWeatherToken;
    let jsonParsed = await fetch(url);
    jsonParsed = await jsonParsed.json();
    
    return parseWeather(jsonParsed);
}

function parseWeather(weatherJson) {
    let result = {};
    result = {
        avgTemp: parseInt(weatherJson.main.temp) - 270,
        minTemp: parseInt(weatherJson.main.temp_min) - 270,
        maxTemp: parseInt(weatherJson.main.temp_max) - 270,
    }
    return result;
}

module.exports = {
    getWeather
}