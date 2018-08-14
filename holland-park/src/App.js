import React, { Component } from 'react';
import MapContainer from './MapContainer';
import MapFilterFS from './MapFilterFS';

const foursquare = require('react-foursquare')({
  clientID: 'LEZHUWQW2RE05TR3ZEXPYMXQIGRJLVDA4DELG0RJMZXMMQOP',
  clientSecret: 'ORHDBJZPFD2U3KQJVRJBVFMC0Z1VZ0RD1FFA2SXJ4YDOYVM5'
});


class App extends Component {
	state = {
		items: []
	}

	componentDidMount() {
		this.updatePlaces();
    }

    updatePlaces = (category) => {
    	let params = {
    		"ll": "51.501757,-0.203186",
 			"radius": 310,
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
	      		    <MapContainer items={items} />
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
