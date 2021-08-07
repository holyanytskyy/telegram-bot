'use strict';

const myCommands = [
    {command: '/start', description: 'Початок роботи з ботом'},
    {command: '/weather', description: `Перелік міст де ти можеш дізнатись погоду`}
];

const weatherOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Київ', callback_data: 'Kyiv'}],
            [{text: 'Вараш', callback_data: 'Вараш'}],
        ]
    })
}

const getMessage = (weatherObj, city) => {
    return `Сьогодні у місті ${city} середня температура становить ${weatherObj.avgTemp} °C.
Мінімальна температура становить ${weatherObj.minTemp} °C, максимальна ${weatherObj.maxTemp} °C.`
}

module.exports = {
    getMessage,
    myCommands,
    weatherOptions
}