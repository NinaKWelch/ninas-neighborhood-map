import React, { Component } from 'react';
import MapContainer from './MapContainer';
import MapFilterFS from './MapFilterFS';

const foursquare = require('react-foursquare')({
  clientID: 'LEZHUWQW2RE05TR3ZEXPYMXQIGRJLVDA4DELG0RJMZXMMQOP',
  clientSecret: 'ORHDBJZPFD2U3KQJVRJBVFMC0Z1VZ0RD1FFA2SXJ4YDOYVM5'
});


class App extends Component {
	state = {
		places: [
		    {name: 'Holland Park Cafe', id:'1', category: 'food', location: {lat: 51.502042, lng: -0.203067}},
		    {name: 'Holland Park Playground', id:'2', category: 'fun', location: {lat: 51.502208, lng: -0.205809}},
		    {name: 'Kyoto Garden', id:'3', category: 'garden', location: {lat: 51.502992, lng: -0.20469}},
		    {name: 'Lord Holland\'s Pond', id:'4', category: 'garden', location: {lat: 51.503225, lng: -0.203667}},
		    {name: 'Leighton House', id:'5', category: 'museum', location: {lat: 51.49869, lng: -0.203021}},
		    {name: 'The Belvedere', id:'6', category: 'food', location: {lat: 51.501819, lng: -0.204205}},
		    {name: 'The Design Museum', id:'7', category: 'museum', location: {lat: 51.499897, lng: -0.200244}},
		    {name: 'The Orangery', id:'8', category: 'music', location: {lat: 51.501679, lng: -0.204083}},
		    {name: 'Tortoises with Triangle', id:'9', category: 'fun', location: {lat: 51.503729, lng: -0.207339}},
		    {name: 'Opera Holland Park', id:'10', category: 'music', location: {lat: 51.502433, lng: -0.202219}}
		],
		items: []
	}

	componentDidMount() {
		this.updatePlaces();
    }

    updatePlaces = (category) => {
    	let params = {
    		"ll": "51.501757,-0.203186",
 			"radius": 350,
			"categoryId": category
    	};

       	foursquare.venues.getVenues(params)
  	 	.then(res => {
      		this.setState({ items: res.response.venues });
    	});
    }

	render() {

	  	const { places, items } = this.state

	    return (
	        <div className="App">
	        	<header>
	        		<h1 className="app-name">Holland Park</h1>
	        	</header>

	        	<section>
		      	    <MapContainer/>
		      	</section>

		        <main>
					<MapFilterFS items={items} updatePlaces={this.updatePlaces}/>
		        </main>

		        <footer>
		        	<p>All Rights Reserved.</p>
		        </footer>
	        </div>
	    );
	}
}

export default App;
