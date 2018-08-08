//Google Maps

var map;
var markers = [];

function initMap() {
  // Create a new map - only center and zoom are required
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.501757, lng: -0.203186},
    zoom: 15
  });

  var locations = [
    {
      title: 'Holland Park Cafe',
      location: {
        lat: 51.502042,
        lng: -0.203067
      }
    },
    {
      title: 'Holland Park Playground',
      location: {
        lat: 51.502208,
        lng: -0.205809
      }
    },
    {
      title: 'Kyoto Garden',
      location: {
        lat: 51.502992,
        lng: -0.20469
      }
    },
      {
      title: 'Lord Holland\'s Pond',
      location: {
        lat: 51.503225,
        lng: -0.203667
      }
    },
      {
      title: 'Leighton House Museum',
      location: {
        lat: 51.49869,
        lng: -0.203021
      }
    },
      {
      title: 'The Belvedere',
      location: {
        lat: 51.501819,
        lng: -0.204205
      }
    },
      {
      title: 'The Design Museum',
      location: {
        lat: 51.499897,
        lng: -0.200244
      }
    },
      {
      title: 'The Orangery',
      location: {
        lat: 51.501679,
        lng: -0.204083
      }
    },
      {
      title: 'Tortoises with Triangle',
      location: {
        lat: 51.503729,
        lng: -0.207339
      }
    },
      {
      title: 'Opera Holland Park',
      location: {
        lat: 51.502433,
        lng: -0.202219
      }
    }
  ];

  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  //create markers for the locations array objects
  for (var i = 0; i < locations.length; i++) {
    // Get marker info
    var position = locations[i].location;
    var title = locations[i].title;

    // Create markers
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Create marker array
    markers.push(marker);

    // Extend the boundaries of the map for each marker
    bounds.extend(marker.position);

    // Event listener for markers
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow);
    });
  }

  // Open info window when marker is clicked
  // Only one window can be open at any time
  function populateInfoWindow(marker, infoWindow) {
    // Check that info window for the marker is not open
    if (infoWindow.marker != marker) {
      infoWindow.marker = marker;
      infoWindow.setContent('<div>' + marker.title + '</div>');
      infoWindow.open(map, marker);
      // Clear marker property in window is closed
      infoWindow.addListener('closeclick', function() {
        infoWindow.setMarker(null);
      });
    }
    map.fitBounds(bounds);
  }
}
