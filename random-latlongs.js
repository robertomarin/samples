var fs = require('fs');

var randomInt = function (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var nextLatLong = function() {
	var x = randomInt(1, 1400);
	if(x > 496 && x < 504) {
		return nextLatLong();
	} else if (x > 396 && x < 404) {
		return nextLatLong();
	} else if (x > 896 && x < 904) {
		return nextLatLong();
	} else if (x > 996 && x < 1004) {
		return nextLatLong();
	} else if (x < 4 || x > 1396) {
		return nextLatLong();
	}

	return x;
}

var nextBeds = function() {
	return randomInt(1, 5);
}

var squareMeters = function() {
	return randomInt(34, 200);
}

var Property = function() {
	this.id = 0;
	this.lat = 0;
	this.long = 0;
	this.beds = 0;
	this.baths = 0;
	this.squareMeters = 0;
};

var properties = {
	totalProperties: 0,
	properties: []
}

for (i = 1; i < 2001; i++) {
	var property = new Property();
	property.id = i;
	property.lat = nextLatLong();
	property.long = nextLatLong();
	property.squareMeters = squareMeters();

	property.beds = Math.floor(property.squareMeters / 10 / 2);
	property.beds = property.beds <= 5 ? property.beds : 5;

	property.baths = property.beds - 1 >= 1 ? property.beds -1 : 1;

	properties.properties.push(property);
}

properties.totalProperties = properties.properties.length;

fs.writeFileSync('properties.js', 'var properties = ' + JSON.stringify(properties, null, 2), 'utf8');
// console.log(JSON.stringify(properties, null, 2));