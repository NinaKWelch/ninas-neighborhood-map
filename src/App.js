import React, { Component } from 'react';
import MapContainer from './MapContainer';
import MapFilterFS from './MapFilterFS';
import PlaceFS from './PlaceFS';

//FourSquare API
const foursquare = require('react-foursquare')({
  clientID: 'LEZHUWQW2RE05TR3ZEXPYMXQIGRJLVDA4DELG0RJMZXMMQOP',
  clientSecret: 'ORHDBJZPFD2U3KQJVRJBVFMC0Z1VZ0RD1FFA2SXJ4YDOYVM5'
});

//initial categories to fetch from FourSquare API
const allCategories = "4bf58dd8d48988d136941735,4bf58dd8d48988d1e2931735,58daa1558bbb0b01f18ec203,4e39a956bd410d7aed40cbc3,4bf58dd8d48988d1e7941735,4bf58dd8d48988d15a941735,4bf58dd8d48988d181941735,4bf58dd8d48988d1c4941735,4bf58dd8d48988d16d941735";

//location coordinates for Holland Park
const hollandPark = '51.501757,-0.203186'

class App extends Component {
	state = {
		items: [],
		activeItem: {}
	}

	//when page loads for the first time
	//fetch places form FourSquare API
	//that correspond to set categories
	componentDidMount() {
		this.updatePlaces(allCategories);
		document.title = 'Holland Park'
  	}

  	//when list item or marker is clicked
  	//and becomes active
  	//remove any previuosly active items
  	componentDidUpdate(prevProps, prevState) {
    	        if (prevState.items !== this.state.items) {
			this.setState({ activeItem: {} });
    	        }
	}

	//fetch places form FourSquare API
	//that correspond to selected categories
	//and are within Holland Park
  	updatePlaces = (category) => {
  		let params = {
    		"ll": hollandPark,
    		v: 20180829,
 			"radius": 310,
			"categoryId": category
  		};

    	foursquare.venues.getVenues(params)
    	.then(res => {
    		this.setState({ items: res.response.venues });
    		document.getElementById('error-fs').setAttribute('style', 'display: none;');
    	}).catch(err => {
    		// Handle loading errors
    		console.log(err);
    		document.getElementById('error-fs').setAttribute('style', 'display: initial;');
    	});

    	//close any previously open info window
  		this.closeAllWindows();
  	}

	//fetch venue information form FourSquare API
	//by venue id (required)
 	showInfoOnMap = (queryId) => {
		let params = {
			"venue_id": queryId
		};

    	foursquare.venues.getVenue(params)
    	.then(res => {
    		this.setState({ activeItem: res.response.venue });
    		document.getElementById('error-fs').setAttribute('style', 'display: none;');
    	}).catch(err => {
    		// Handle loading errors
    		console.log(err);
    		document.getElementById('error-fs').setAttribute('style', 'display: initial;');
    	});

    	//close previously open info window
	 	this.closeAllWindows();
	 	//open the info window of currently selected venue
  		this.showInfoWIndow(queryId);
 	}

 	//when new selection is made
 	//close previous info window
 	closeAllWindows = () => {
 		//loop through the list of venues
 		for (var i = 0; i < this.state.items.length; i++) {
 			let item = this.state.items[i];

 		//hide any open info windows (only one can be seen at any time)
		const closeWindow = document.getElementById(item.id);
	 		closeWindow.firstChild.setAttribute('style', 'display: none;');
	 	}
 	}

 	//find the currently selected venue from the list
 	//by matching the selected venue with the listed venue
 	//and open the right info window
 	showInfoWIndow = (queryId) => {
 		for (var i = 0; i < this.state.items.length; i++) {
 			let item = this.state.items[i];

 			if (item.id === queryId) {
 				const window = document.getElementById(queryId);
 				window.firstChild.setAttribute('style', 'display: initial; transition: display 15s ease-out');
 			}
 		}
 	}

	render() {

	        const { items, activeItem } = this.state

	        return (
		        <div className="App">
		        	<header>
		        		<h1 className="app-name"><a href="/">Holland Park</a></h1>
		        	</header>

		        	<main className="flex-container main-content">
				        <section>
							<MapFilterFS updatePlaces={this.updatePlaces}/>

							<div id="error-fs"><p>Venues failed to load : (</p></div>

							<ul className="places-list" role="tablist" aria-label="Holland Park Venues">
								{items.map(item => (<PlaceFS item={item} key={item.id} activeItem={activeItem} showInfoOnMap={this.showInfoOnMap}/>))}
		                    </ul>
				        </section>

			      	    <aside>
			      		    <MapContainer items={items} activeItem={activeItem} showInfoOnMap={this.showInfoOnMap}/>
			      	    </aside>
			        </main>

			        <footer>
			        	<p>All Rights Reserved.</p>
			        </footer>
		        </div>
	    	);
        }
}

export default App;
