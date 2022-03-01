"use strict";

var express = require('express');

var path = require('path');

var hbs = require('hbs');

var geocode = require('./utils/geocode.js');

var forecast = require('./utils/forecast.js');

var app = express(); //define paths for the express

var publicDirectoryPath = path.join(__dirname, '../public');
var viewPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); //setup handelbars engine and views location

app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather',
    name: 'Vinay Kumar REddy'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'about',
    name: 'vinay'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    title: 'Help',
    name: 'reddy'
  });
});
app.get('/weather', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, function (error, _ref) {
    var latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;
    console.log('req.query.address', req.query.address);
    debugger;

    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, function (error, forecastData) {
      console.log('forecast', forecastData); // if (error) {
      // 	return res.send({ error });
      // }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});
app.get('/products', function (req, res) {
  console.log(req.query.search);

  if (!req.query.search) {
    return res.send({
      error: 'You must have to provide a search term'
    });
  }

  res.send({
    products: []
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: 'Help',
    name: '404 message',
    errorMessage: '404 page not found'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    title: 'Help',
    name: '404 message',
    errorMessage: '404 page not found'
  });
});
app.listen(3000, function () {
  console.log('server is up on port 3000');
});