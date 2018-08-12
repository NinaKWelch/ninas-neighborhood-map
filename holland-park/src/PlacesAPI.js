
/**
* Foursquare API
*/


export const foursquare = require('react-foursquare')({
  clientID: 'LEZHUWQW2RE05TR3ZEXPYMXQIGRJLVDA4DELG0RJMZXMMQOP',
  clientSecret: 'ORHDBJZPFD2U3KQJVRJBVFMC0Z1VZ0RD1FFA2SXJ4YDOYVM5'
});

export const params = {
  "ll": "51.501757, -0.203186",
  "query": 'Holland Park'
};



/*export const get = (placeImg) =>
fetch(`${apiFS}/v2/venues/${venueId}`, { photos }),
	.then(res => res.json())
	.then(data => data.venue)
	    // Code for handling API response
	.catch(function() {
	    // Code for handling errors
});*/




/**
* Google Maps API
*/

//fetch('https://api.foursquare.com/v2/venues/explore?client_id=LEZHUWQW2RE05TR3ZEXPYMXQIGRJLVDA4DELG0RJMZXMMQOP&client_secret=ORHDBJZPFD2U3KQJVRJBVFMC0Z1VZ0RD1FFA2SXJ4YDOYVM5&v=20180323&limit=1&ll=40.7243,-74.0018&venuePhotos=1')