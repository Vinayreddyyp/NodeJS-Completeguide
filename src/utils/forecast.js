const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=772d92847a36674093494ad7beb57858&query=' +
		latitude +
		',' +
		longitude +
		'&units=f';
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('unable to connect the url', undefined);
		} else if (response.body.error) {
			callback('unable to find the location', undefined);
		} else {
			callback(
				'udefined',
				response.body.current.weather_descriptions[0] +
					'. It is currently ' +
					response.body.current.temperature +
					' degress out.'
			);
		}
	});
};

module.exports = forecast;
