const request = require('postman-request');

require('dotenv').config();

const PLACES_API = process.env.PLACES_API;

const places = (placeQuery, cb) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeQuery}&inputtype=textquery&fields=name,photos&key=${PLACES_API}`
  request(url, { json: true }, (err, res) => {
    if (err) {
      return cb(err);
    }

    const imageURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${res.body.candidates[0].photos[0].photo_reference}&key=${PLACES_API}&maxwidth=1920&maxheight=1080`;
    cb(null, imageURL);
  });
}

module.exports = places;
