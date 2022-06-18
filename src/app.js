const path = require('path');
const express = require('express');
const forecast = require('./utils/forecast');
const ipstack = require('./utils/ipstack');

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

    forecast(latitude, longitude, (_err, data) => {
      if (err) {
        return res.send({ err });
      }

      res.render('index', data);
    });
  });
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});
