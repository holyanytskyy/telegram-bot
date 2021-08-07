'use strict';

const TelegramApi = require('node-telegram-bot-api');
const config = require('config');
const telegramToken = config.get('telegramToken');

const {getWeather} = require('./helpers/openweather');
const {getMessage, myCommands, weatherOptions} = require('./helpers/helper');

const bot = new TelegramApi(telegramToken, {polling: true});

const weatherInfo = (msg, match) => {
    const chatId = msg.chat.id;
    return bot.sendMessage(chatId, 'В якому місті тебе цікавить погода?', weatherOptions);
}

const cityCallback = async (msg, match) => {
    const chatId = msg.chat.id;
    let weather = await getWeather('Kyiv');
    let message = `Сьогодні температура ${parseInt(weather.main.temp) - 270} °C`;
    return bot.sendMessage(chatId, message);
    
};

const messageCallback = msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/5a7/cb3/5a7cb3d0-bca6-3459-a3f0-5745d95d54b7/1.webp')
};

const handleButtonQuery = async (msg) => {
    const chatId = msg.message.chat.id;
    let weather;
    if (/Київ|Kyiv/gi.test(msg.data)) {
        weather = await getWeather('Kyiv');
        return bot.sendMessage(chatId, getMessage(weather, 'Київ'));
    } else if (/Вараш/gi.test(msg.data)){
        weather = await getWeather('Kuznetsovsk');
        return bot.sendMessage(chatId, getMessage(weather, 'Вараш'));
    }
};

const runBot = () => {
    //set helpMenu commands
    bot.setMyCommands(myCommands);
    bot.onText(/\/start/i, messageCallback);
    bot.onText(/\/weather/i, weatherInfo)
    bot.onText(/Kyiv|Київ|Kiev/i, cityCallback);
    bot.on('callback_query', handleButtonQuery)

    bot.on("polling_error", (msg) => console.error(msg));

}

runBot();