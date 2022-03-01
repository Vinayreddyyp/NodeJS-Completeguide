const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const app = express();

//define paths for the express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handelbars engine and views location
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Vinay Kumar REddy',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'about',
		name: 'vinay',
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'reddy',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!',
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location }) => {
		console.log('req.query.address', req.query.address);
		debugger;
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			console.log('forecast', forecastData);
			// if (error) {
			// 	return res.send({ error });
			// }

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
});

app.get('/products', (req, res) => {
	console.log(req.query.search);
	if (!req.query.search) {
		return res.send({
			error: 'You must have to provide a search term',
		});
	}
	res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: '404 message',
		errorMessage: '404 page not found',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: '404 message',
		errorMessage: '404 page not found',
	});
});

app.listen(3000, () => {
	console.log('server is up on port 3000');
});
