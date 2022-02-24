const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const address = process.argv[2];
console.log('address', process.argv);
geocode(address, (error, data) => {
	console.log('inside passing address', address);
	forecast(data.latitude, data.longitude, (error, forecastData) => {
		// if (error) {
		// 	return console.log('inside Error', error);
		// }
		console.log('location', data.location);
		console.log('Data', forecastData);
	});
	// if (error) {
	// 	return console.log('outside error', error);
	// } else {

	// }
});
