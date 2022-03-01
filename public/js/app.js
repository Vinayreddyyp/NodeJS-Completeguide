console.log('js is loading from the app.js file');

fetch('/weather?address=!').then((response) => {
	response.json().then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			console.log('data.location', data.location);
			console.log('data.forecast', data.forecast);
		}
	});
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
	console.log('testing', location);
});
