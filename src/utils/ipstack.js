const request = require('postman-request');

require('dotenv').config();
const IP_API = process.env.IP_STACK;

const ipstack = (cb) => {
  const url = `http://api.ipstack.com/check?access_key=${IP_API}`;
  request(url, { json: true }, (err, res) => {
    if (err) {
      cb("Unable to connect to ipstack!");
    } else if (res.body.error) {
      cb(res.body.error.info);
    } else {
      cb(null, { latitude, longitude } = res.body);
    }
  });
}

module.exports = ipstack;
