import React, { Component } from 'react';
import MapContainer from './MapContainer';
import MapFilterFS from './MapFilterFS';

const foursquare = require('react-foursquare')({
  clientID: 'LEZHUWQW2RE05TR3ZEXPYMXQIGRJLVDA4DELG0RJMZXMMQOP',
  clientSecret: 'ORHDBJZPFD2U3KQJVRJBVFMC0Z1VZ0RD1FFA2SXJ4YDOYVM5'
});

const allCategories = "4bf58dd8d48988d136941735,4bf58dd8d48988d1e2931735,58daa1558bbb0b01f18ec203,4e39a956bd410d7aed40cbc3,4bf58dd8d48988d1e7941735,4bf58dd8d48988d15a941735,4bf58dd8d48988d181941735,4bf58dd8d48988d1c4941735,4bf58dd8d48988d16d941735";
const hollandPark = '51.501757,-0.203186'

class App extends Component {
	state = {
		items: [],
		activeItem: []
	}

	componentDidMount() {
		this.updatePlaces(allCategories);
    }

    componentDidUpdate(prevProps, prevState) {
	    if (prevState.items !== this.state.items) {
	        this.setState({ activeItem: [] });
	    }
	}

    updatePlaces = (category) => {
    	let params = {
    		"ll": hollandPark,
 			"radius": 310,
			"categoryId": category
    	};

       	foursquare.venues.getVenues(params)
  	 	.then(res => {
      		this.setState({ items: res.response.venues });
    	});
    }

   	showInfoOnMap = (query) => {
		let params = {
			"ll": hollandPark,
			"query": query,
			"limit": 1
		};

       	foursquare.venues.getVenues(params)
  	 	.then(res => {
      		this.setState({ activeItem: res.response.venues });
    	});
   	}

	render() {

	  	const { items, activeItem } = this.state

	    return (
	        <div className="App">
	        	<header>
	        		<h1 className="app-name">Holland Park</h1>
	        	</header>

        		<section>
	      		    <MapContainer items={items} activeItem={activeItem} showInfoOnMap={this.showInfoOnMap}/>
	      	    </section>

		        <main>
					<MapFilterFS items={items} updatePlaces={this.updatePlaces} showInfoOnMap={this.showInfoOnMap}/>
		        </main>

		        <footer>
		        	<p>All Rights Reserved.</p>
		        </footer>
	        </div>
	    );
	}
}

export default App;
