const path = require('path');
const express = require('express');
const forecast = require('./utils/forecast');
const ipstack = require('./utils/ipstack');
const places = require('./utils/places');

const app = express();

app.set('view engine', 'hbs'); // setup handlebars engine

// static directory to serve
const PUBLIC_FOLDER = path.join(__dirname, '../public');
app.use(express.static(PUBLIC_FOLDER));

app.get('/', (_req, res) => {
  ipstack((err, { latitude, longitude } = {}) => {
    if (err) {
      return res.send({ err });
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }

      places(`${forecastData.location.region} ${forecastData.location.country}`, (err, data) => {
        res.render('index', { ...forecastData, image: data });
      });
    });
  });
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});
