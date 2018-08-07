//Google Maps

var map;

/*function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 51.5030, lng: -0.2030},
		zoom: 15
	});
}*/

function initMap() {
  // The location of Holland Park
  var hollandPark = {lat: 51.501757, lng: -0.203186};
  // The map, centered at Holland Park
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 14, center: hollandPark});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: hollandPark, map: map});
}