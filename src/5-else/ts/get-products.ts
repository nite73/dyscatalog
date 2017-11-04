
function getJSON(url) {
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			let status = xhr.status;
			if (status === 200) {
				resolve(xhr.response);
			} else {
				reject(status);
			}
		};
		xhr.send();
	});
}

getJSON('https://api.mongolab.com/api/1/databases/dyscatalog/collections/products?apiKey=508eb961e4b0c54ca4492fad').then(function(data) {
	const listOfProducts = { data };
	//console.log(JSON.stringify(listOfProducts, undefined, 2));

	return listOfProducts;
}, function(status) {
	alert('Something went wrong.');
});

