

var alpha = document.getElementById('alpha');

alpha.addEventListener('click', function () {
	console.log('this is alpha')
})

var gamma = document.getElementById('gamma');

gamma.addEventListener('click', function (event) {
	console.log('click on gamma')
	event.stopPropagation();
})