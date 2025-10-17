const app = require('../server'); // import express app

module.exports = (req, res) => {
  app(req, res); // let Express handle the request
};
