const request = require('postman-request');

require('dotenv').config();
const WEATHER_API = process.env.WEATHER_STACK;

const forecast = (latitude, longitude, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API}&query=${latitude},${longitude}`;
  request(url, { json: true }, (err, res) => {
    if (err) {
      cb("Unable to connect to weatherstack!");
    } else if (res.body.error) {
      cb("Parameter error");
    } else {
      cb(null, {
        description: res.body.current.weather_descriptions[0],
        temperature: res.body.current.temperature,
        feelslike: res.body.current.feelslike,
        location: res.body.location
      });
    }
  });
};

module.exports = forecast;
