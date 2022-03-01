console.log('js is loading from the app.js file');

fetch('http://localhost:3000/weather?address=anantapur').then((response) => {
	response.json().then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			console.log('data.location', data.location);
			console.log('data.forecast', data.forecast);
		}
	});
});

// const weatherForm = document.querySelector('form');

// weatherForm.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	console.log('testing');
// });
